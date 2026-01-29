import { Play, Calendar, Users, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

interface ResultCardProps {
    title: string;
    type: string;
    description: string;
    metadata: {
        actors?: string[];
        year?: string;
        platform?: string;
    };
    confidence?: number;
}

export function ResultCard({ title, type, description, metadata, confidence }: ResultCardProps) {
    return (
        <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="glass-panel rounded-xl overflow-hidden p-1">
                {/* Header Gradient */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                <div className="p-6 md:p-8 space-y-6">
                    {/* Top Badge & Confidence */}
                    <div className="flex items-center justify-between">
                        <span className={clsx(
                            "px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border",
                            type === 'Movie' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                type === 'Sport' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                    "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        )}>
                            {type}
                        </span>
                        {confidence && (
                            <span className="text-xs text-slate-500 font-mono">
                                {Math.round(confidence * 100)}% Match
                            </span>
                        )}
                    </div>

                    {/* Main Title */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
                        <p className="text-slate-400 leading-relaxed">{description}</p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        {metadata.actors && (
                            <div className="flex items-start space-x-3">
                                <Users className="w-5 h-5 text-slate-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-slate-300">Cast / Players</p>
                                    <p className="text-sm text-slate-500">{metadata.actors.join(", ")}</p>
                                </div>
                            </div>
                        )}

                        {metadata.year && (
                            <div className="flex items-start space-x-3">
                                <Calendar className="w-5 h-5 text-slate-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-slate-300">Year / Season</p>
                                    <p className="text-sm text-slate-500">{metadata.year}</p>
                                </div>
                            </div>
                        )}

                        {metadata.platform && (
                            <div className="flex items-start space-x-3">
                                <Play className="w-5 h-5 text-slate-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-slate-300">Available on</p>
                                    <p className="text-sm text-slate-500">{metadata.platform}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex justify-end">
                        <a
                            href="#"
                            className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Find streams <ExternalLink className="ml-1 w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
