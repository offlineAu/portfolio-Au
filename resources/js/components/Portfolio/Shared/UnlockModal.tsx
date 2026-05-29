import { Form } from '@inertiajs/react';
import { Lock, X } from 'lucide-react';

import type { ProfileMode } from '@/components/Portfolio/types';

type UnlockModalProps = {
    isOpen: boolean;
    mode: ProfileMode;
    onClose: () => void;
};

export default function UnlockModal({
    isOpen,
    mode,
    onClose,
}: UnlockModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div
                className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl ${
                    mode === 'github'
                        ? 'border-[#30363d] bg-[#161b22] text-[#c9d1d9]'
                        : 'border-slate-200 bg-white text-slate-900'
                }`}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p
                            className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                                mode === 'github'
                                    ? 'text-[#58a6ff]'
                                    : 'text-blue-600'
                            }`}
                        >
                            Locked portfolio mode
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold">
                            Unlock editing
                        </h2>
                        <p
                            className={`mt-3 text-sm leading-6 ${
                                mode === 'github'
                                    ? 'text-[#8b949e]'
                                    : 'text-slate-600'
                            }`}
                        >
                            Editing mode enables public owner-only controls for
                            updating profile media. Once unlocked, avatar and
                            cover upload panels become visible in the clone UI.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className={`rounded-md p-2 transition-colors ${
                            mode === 'github'
                                ? 'text-[#8b949e] hover:bg-[#21262d] hover:text-white'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        aria-label="Close unlock modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div
                    className={`mt-5 rounded-xl border p-4 ${
                        mode === 'github'
                            ? 'border-[#30363d] bg-[#0d1117]'
                            : 'border-slate-200 bg-slate-50'
                    }`}
                >
                    <div className="flex items-start gap-3">
                        <Lock
                            className={`mt-0.5 h-5 w-5 ${
                                mode === 'github'
                                    ? 'text-[#58a6ff]'
                                    : 'text-blue-600'
                            }`}
                        />
                        <div className="space-y-1 text-sm">
                            <p className="font-medium">Before you continue</p>
                            <p
                                className={
                                    mode === 'github'
                                        ? 'text-[#8b949e]'
                                        : 'text-slate-600'
                                }
                            >
                                This owner key only unlocks editing for the
                                current browser session. Visitors stay locked
                                out by default.
                            </p>
                        </div>
                    </div>
                </div>

                <Form
                    action="/portfolio/unlock"
                    method="post"
                    className="mt-6 space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-2">
                                <label
                                    htmlFor="edit_key"
                                    className="text-sm font-medium"
                                >
                                    Owner edit key
                                </label>
                                <input
                                    id="edit_key"
                                    type="password"
                                    name="edit_key"
                                    placeholder="Enter your private key"
                                    className={`w-full rounded-xl border px-4 py-3 text-sm transition-colors outline-none ${
                                        mode === 'github'
                                            ? 'border-[#30363d] bg-[#0d1117] text-white placeholder:text-[#6e7681] focus:border-[#58a6ff]'
                                            : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500'
                                    }`}
                                />
                                {errors.edit_key && (
                                    <p className="text-sm text-red-400">
                                        {errors.edit_key}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                                        mode === 'github'
                                            ? 'border border-[#30363d] bg-transparent text-[#c9d1d9] hover:bg-[#21262d]'
                                            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-colors ${
                                        mode === 'github'
                                            ? 'bg-emerald-600 hover:bg-emerald-500'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    Confirm and unlock
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
