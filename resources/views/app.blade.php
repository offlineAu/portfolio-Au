<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        @inertiaHead
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    </head>
    <body class="antialiased">

        <div id="native-loader" style="
            position:fixed; inset:0; z-index:99999;
            background:#08070a;
            display:flex; align-items:center; justify-content:center;
            font-family:sans-serif;
            transition: opacity 0.6s ease, transform 0.6s ease;
        ">
            <!-- Film grain -->
            <div style="
                position:absolute; inset:0; opacity:0.055; pointer-events:none;
                background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\");
                background-size:200px 200px;
                animation:grain 0.5s steps(2) infinite;
            "></div>

            <!-- Vignette -->
            <div style="
                position:absolute; inset:0; pointer-events:none;
                background:radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(8,7,10,0.75) 100%);
            "></div>

            <!-- HUD corner TL -->
            <div style="position:absolute; top:24px; left:24px; width:22px; height:22px;
                border-top:1px solid rgba(200,169,110,0.35); border-left:1px solid rgba(200,169,110,0.35);
                animation:corner-in 0.6s 0.05s both;"></div>
            <!-- HUD corner TR -->
            <div style="position:absolute; top:24px; right:24px; width:22px; height:22px;
                border-top:1px solid rgba(200,169,110,0.35); border-right:1px solid rgba(200,169,110,0.35);
                animation:corner-in 0.6s 0.1s both;"></div>
            <!-- HUD corner BL -->
            <div style="position:absolute; bottom:24px; left:24px; width:22px; height:22px;
                border-bottom:1px solid rgba(200,169,110,0.35); border-left:1px solid rgba(200,169,110,0.35);
                animation:corner-in 0.6s 0.15s both;"></div>
            <!-- HUD corner BR -->
            <div style="position:absolute; bottom:24px; right:24px; width:22px; height:22px;
                border-bottom:1px solid rgba(200,169,110,0.35); border-right:1px solid rgba(200,169,110,0.35);
                animation:corner-in 0.6s 0.2s both;"></div>

            <!-- HUD labels -->
            <div style="position:absolute; top:32px; left:40px;
                font-size:7px; letter-spacing:2.5px; text-transform:uppercase;
                color:rgba(200,169,110,0.3); animation:fade-in 0.6s 0.3s both;">
                SYS.INIT // PORTFOLIO.v2
            </div>
            <div style="position:absolute; bottom:32px; right:40px; text-align:right;
                font-size:7px; letter-spacing:2.5px; text-transform:uppercase;
                color:rgba(200,169,110,0.3); animation:fade-in 0.6s 0.3s both;">
                AU // DEV — LOADING ASSETS
            </div>

            <!-- Scan line -->
            <div style="
                position:absolute; left:0; right:0; height:1px; top:0; pointer-events:none;
                background:linear-gradient(90deg, transparent, rgba(200,169,110,0.25) 40%, rgba(200,169,110,0.5) 50%, rgba(200,169,110,0.25) 60%, transparent);
                animation:scan-sweep 2.8s cubic-bezier(0.4,0,0.6,1) 0.5s infinite;
            "></div>

            <!-- Center content -->
            <div style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:2rem;">

                <!-- Ring + monogram -->
                <div style="position:relative; width:160px; height:160px; display:flex; align-items:center; justify-content:center; animation:fade-in 0.5s 0.05s both;">
                    <svg style="position:absolute; inset:0; width:100%; height:100%;" viewBox="0 0 160 160">
                        <defs>
                            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stop-color="#c8a96e"/>
                                <stop offset="100%" stop-color="#f0d898"/>
                            </linearGradient>
                        </defs>
                        <circle fill="none" stroke="rgba(200,169,110,0.08)" stroke-width="1" cx="80" cy="80" r="72"/>
                        <circle fill="none" stroke="url(#g)" stroke-width="1" stroke-linecap="round"
                            cx="80" cy="80" r="72"
                            stroke-dasharray="452" stroke-dashoffset="452"
                            style="transform-origin:center; transform:rotate(-90deg); animation:ring-fill 2.4s 0.3s cubic-bezier(0.16,1,0.3,1) forwards;"/>
                    </svg>
                    <!-- Spinning outer ring -->
                    <div style="
                        position:absolute; inset:-10px; border-radius:50%;
                        border:1px solid transparent;
                        border-top-color:rgba(200,169,110,0.4);
                        border-right-color:rgba(200,169,110,0.15);
                        animation:spin 2s linear infinite;
                    "></div>
                    <!-- Monogram -->
                    <div style="    
                        font-family:Georgia,serif; font-size:1.8rem;
                        color:#f0ede6; letter-spacing:0.12em; line-height:1;
                        position:relative; z-index:2;
                        text-shadow:0 0 40px rgba(200,169,110,0.3);
                        animation:fade-in 0.6s 0.4s both;
                    ">A<span style="color:#c8a96e">U.</span></div>
                </div>

                <!-- Name -->
                <div style="display:flex; flex-direction:column; align-items:center; gap:4px; animation:name-in 0.8s 0.5s both;">
                    <div style="
                        font-family:Georgia,serif; font-size:clamp(3rem,8vw,5.5rem);
                        color:#f0ede6; letter-spacing:0.1em; line-height:1;
                        text-shadow:0 2px 0 rgba(0,0,0,0.7), 0 0 80px rgba(200,169,110,0.12);
                    ">AIRL</div>
                    <div style="
                        font-family:Georgia,serif; font-style:italic;
                        font-size:clamp(0.8rem,1.8vw,1rem);
                        color:#c8a96e; letter-spacing:0.05em;
                        animation:fade-in 0.6s 0.9s both;
                    ">Web Developer · AI Patron</div>
                </div>

                <!-- Progress bar -->
                <div style="width:clamp(180px,28vw,280px); display:flex; flex-direction:column; gap:8px; animation:fade-in 0.6s 0.7s both;">
                    <div style="width:100%; height:1px; background:rgba(200,169,110,0.1); position:relative; overflow:hidden;">
                        <div style="
                            position:absolute; inset:0;
                            background:linear-gradient(90deg,#c8a96e,#f0d898);
                            box-shadow:0 0 8px rgba(200,169,110,0.6);
                            animation:progress-fill 2.2s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
                            transform:translateX(-100%);
                        "></div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:7px; letter-spacing:2.5px; text-transform:uppercase; color:rgba(200,169,110,0.4);">
                            Initializing
                        </span>
                        <span style="font-family:Georgia,serif; font-size:0.95rem; color:#c8a96e; letter-spacing:0.05em;">
                            —
                        </span>
                    </div>
                </div>

            </div>
        </div>

        <style>
            @keyframes grain {
                0%  { background-position: 0 0; }
                25% { background-position: -10px 5px; }
                50% { background-position: 5px -8px; }
                75% { background-position: -5px 10px; }
                100%{ background-position: 8px -4px; }
            }
            @keyframes fade-in {
                from { opacity:0; }
                to   { opacity:1; }
            }
            @keyframes corner-in {
                from { opacity:0; width:8px; height:8px; }
                to   { opacity:1; width:22px; height:22px; }
            }
            @keyframes name-in {
                from { opacity:0; transform:translateY(12px); }
                to   { opacity:1; transform:translateY(0); }
            }
            @keyframes spin {
                to { transform:rotate(360deg); }
            }
            @keyframes ring-fill {
                to { stroke-dashoffset:0; }
            }
            @keyframes progress-fill {
                from { transform:translateX(-100%); }
                to   { transform:translateX(0); }
            }
            @keyframes scan-sweep {
                0%   { top:0;    opacity:0; }
                5%   { opacity:1; }
                95%  { opacity:0.4; }
                100% { top:100%; opacity:0; }
            }
            #native-loader.done {
                opacity:0;
                transform:translateY(-12px);
                pointer-events:none;
            }
        </style>

        @inertia
    </body>
</html>