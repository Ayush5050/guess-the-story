import { Film, Trophy, Gamepad2 } from 'lucide-react';

export function Header() {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-12">
            <div className="flex items-center space-x-2 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Film className="w-5 h-5 text-blue-400" />
                </div>
                <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <Trophy className="w-5 h-5 text-green-400" />
                </div>
                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Gamepad2 className="w-5 h-5 text-purple-400" />
                </div>
            </div>

            <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    What Scene is That?
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Instantly identify movies, sports matches, and games from short videos using AI.
                    <span className="block text-sm mt-2 text-slate-500">Just paste a Reel, Short, or Tweet link.</span>
                </p>
            </div>
        </div>
    );
}
