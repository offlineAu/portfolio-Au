import React, { useState, useRef, useCallback, useEffect } from 'react';

/* ════════════════════════════════════════════════════════════
   SENTIMENT GAUGE
   A live NLP widget that calls Claude to score text sentiment.
   Drop inside Hero's lp-hero-left-inner, after lp-hero-tagline.
════════════════════════════════════════════════════════════ */

type SentimentResult = {
    score: number;      // -1 (negative) → 0 (neutral) → +1 (positive)
    label: 'Negative' | 'Neutral' | 'Positive';
    confidence: number; // 0–100
    word: string;       // key sentiment word extracted
};

const PROMPT = (text: string) => `Analyze the sentiment of this text: "${text}"

Respond with ONLY valid JSON (no markdown, no explanation):
{
  "score": <float between -1 and 1>,
  "label": "<Negative|Neutral|Positive>",
  "confidence": <integer 0-100>,
  "word": "<single most emotionally charged word from the text, or empty string>"
}`;

// Replace the entire analyzeSentiment function with this:

async function analyzeSentiment(text: string): Promise<SentimentResult> {
    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
        ?.content ?? '';

    const response = await fetch('/api/portfolio/sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN':  csrfToken,
        },
        body: JSON.stringify({ text }),  // ← just send { text }, Laravel handles the rest
    });

    if (!response.ok) throw new Error('Request failed');

    return response.json();
}

/* Map score (-1…+1) to gauge position (0…100%) */
function scoreToPercent(score: number) {
    return Math.round(((score + 1) / 2) * 100);
}

/* Derive dot & label color from score */
function sentimentColor(score: number) {
    if (score > 0.2)  return '#c8a96e';  // gold — positive
    if (score < -0.2) return '#6a4a2a';  // dark amber — negative
    return '#4a4a48';                    // muted — neutral
}

export function SentimentGauge() {
    const [inputText,  setInputText]  = useState('');
    const [result,     setResult]     = useState<SentimentResult | null>(null);
    const [loading,    setLoading]    = useState(false);
    const [error,      setError]      = useState<string | null>(null);
    const [focused,    setFocused]    = useState(false);
    const [animated,   setAnimated]   = useState(false);
    const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevText     = useRef('');

    const analyze = useCallback(async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || trimmed === prevText.current) return;
        prevText.current = trimmed;
        setLoading(true);
        setError(null);
        setAnimated(false);
        try {
            const res = await analyzeSentiment(trimmed);
            setResult(res);
            requestAnimationFrame(() => setAnimated(true));
        } catch {
            setError('Analysis failed. Try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputText(val);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (val.trim().length >= 3) {
            debounceRef.current = setTimeout(() => analyze(val), 900);
        } else {
            setResult(null);
            setAnimated(false);
            prevText.current = '';
        }
    }, [analyze]);

    const handleKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            analyze(inputText);
        }
    }, [analyze, inputText]);

    useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

    const pct   = result ? scoreToPercent(result.score) : 50;
    const color = result ? sentimentColor(result.score) : '#2a2a28';
    const hasResult = !!result && !loading;

    return (
        <div className={`sg-root${focused ? ' sg-root--focused' : ''}${hasResult ? ' sg-root--active' : ''}`}>

            {/* ── eyebrow label ── */}
            <div className="sg-eyebrow">
                <span className="sg-eyebrow__dot" />
                <span>NLP · Sentiment Analysis</span>
                <span className="sg-eyebrow__tag">SentiSphere</span>
            </div>

            {/* ── input ── */}
            <div className="sg-input-wrap">
                <input
                    className="sg-input"
                    type="text"
                    value={inputText}
                    onChange={handleChange}
                    onKeyDown={handleKey}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="How's your day?"
                    maxLength={120}
                    aria-label="Type text to analyze sentiment"
                    spellCheck={false}
                    autoComplete="off"
                />
                <div className={`sg-input-line${focused ? ' sg-input-line--active' : ''}`} />
                {loading && <div className="sg-spinner" aria-hidden />}
            </div>

            {/* ── gauge bar ── */}
            <div className="sg-gauge-wrap" aria-hidden>

                {/* track labels */}
                <div className="sg-track-labels">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                </div>

                {/* the bar */}
                <div className="sg-track">
                    <div className="sg-track-fill" />
                    {/* centre tick */}
                    <div className="sg-track-tick" />
                    {/* animated dot */}
                    <div
                        className={`sg-dot${animated ? ' sg-dot--placed' : ''}`}
                        style={{
                            left: `${pct}%`,
                            background: color,
                            boxShadow: `0 0 10px ${color}99`,
                        }}
                    />
                </div>

                {/* result row */}
                <div className={`sg-result-row${hasResult ? ' sg-result-row--visible' : ''}`}>
                    {result && (
                        <>
                            <span className="sg-result-label" style={{ color }}>
                                {result.label}
                            </span>
                            <span className="sg-result-conf">
                                {result.confidence}% confidence
                            </span>
                            {result.word && (
                                <span className="sg-result-word">
                                    key: <em>{result.word}</em>
                                </span>
                            )}
                        </>
                    )}
                    {error && <span className="sg-error">{error}</span>}
                </div>
            </div>

            {/* ── idle hint ── */}
            {!hasResult && !loading && !inputText && (
                <p className="sg-hint">Type a phrase — watch the ML model respond</p>
            )}
        </div>
    );
}