import React, { useState } from 'react';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

interface PasswordGateProps {
    onAuthenticated: () => void;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ onAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    // 認証情報設定
    const CORRECT_USERNAME = 'admin';
    const CORRECT_PASSWORD = '123';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsChecking(true);

        setTimeout(() => {
            if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
                localStorage.setItem('site_authenticated', 'true');
                onAuthenticated();
            } else {
                setError(true);
                setIsChecking(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center space-y-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 mb-4 group">
                            {isChecking ? (
                                <Unlock className="w-8 h-8 text-cyan-400 animate-pulse" />
                            ) : (
                                <Lock className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                            )}
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
                                Restricted Access
                            </h1>
                            <p className="text-slate-400 text-sm">
                                閲覧するにはIDとパスワードを入力してください。
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setError(false);
                                        }}
                                        className={`w-full bg-slate-950 border ${error ? 'border-red-500/50' : 'border-slate-700 focus:border-cyan-500'} rounded-lg px-4 py-3 text-slate-200 outline-none transition-all duration-300 placeholder:text-slate-600`}
                                        placeholder="ID"
                                        autoFocus
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError(false);
                                        }}
                                        className={`w-full bg-slate-950 border ${error ? 'border-red-500/50' : 'border-slate-700 focus:border-cyan-500'} rounded-lg px-4 py-3 text-slate-200 outline-none transition-all duration-300 placeholder:text-slate-600`}
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-400 text-xs animate-shake">
                                    IDまたはパスワードが間違っています
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isChecking || !username || !password}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                {isChecking ? 'Verifying...' : 'Login'}
                                {!isChecking && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <div className="pt-4 border-t border-slate-800/50">
                            <p className="text-xs text-slate-600 font-mono">
                                SYSTEM STATUS: LOCKED
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordGate;
