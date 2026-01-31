'use client';

import { useState } from 'react';
import { Header } from './components/Header';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { ResultCard } from './components/ResultCard';
import { Search, Sparkles } from 'lucide-react';

interface AnalysisResult {
  title: string;
  type: string;
  description: string;
  people: string[];
  watch_on: string[]; // was metadata.platform, now part of response
  confidence: number;
  // metadata field is removed in favor of flat structure from backend schema
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        // Handle specific status codes
        if (response.status === 422 || response.status === 400) {
          setError('Invalid or unsupported URL. Please check the link and try again.');
        } else if (response.status === 503 || response.status === 500) {
          const errorData = await response.json().catch(() => ({}));
          // If backend sent a specific message, try to use it, else default
          setError(errorData.error || 'The analysis service is currently unavailable. Please check your backend connection.');
        } else if (response.status === 504) {
          setError('The analysis timed out. The video might be too long to process.');
        } else {
          setError(`An error occurred (${response.status}). Please try again.`);
        }
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Network error. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-20 px-4 md:px-24 max-w-5xl mx-auto">
      <Header />

      <div className="w-full max-w-xl space-y-8 mb-16">
        <form onSubmit={handleAnalyze} className="relative flex flex-col gap-4">
          <Input
            placeholder="Paste video link (YouTube, Reel, X)..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            className="h-14 text-lg"
          />
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-0"
            isLoading={loading}
            disabled={!url.trim()}
          >
            {!loading && <Sparkles className="w-5 h-5 mr-2" />}
            Analyze Scene
          </Button>
        </form>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-center animate-in fade-in">
            {error}
          </div>
        )}
      </div>

      {result && (
        <ResultCard
          title={result.title}
          type={result.type}
          description={result.description}
          confidence={result.confidence}
          metadata={{
            actors: result.people,
            // Year not in current backend schema, omitting or could infer if added later
            platform: result.watch_on[0] // Take first platform
          }}
        />
      )}
    </main>
  );
}
