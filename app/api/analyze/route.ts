import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock response based on input (optional: could add simple logic here)
        // For V1, always return "The Dark Knight" example or "Champions League"

        return NextResponse.json({
            title: "The Dark Knight",
            type: "Movie",
            description: "Batman interrogates the Joker in the GCPD holding cell. This iconic scene shows the Joker's chaotic philosophy.",
            metadata: {
                actors: ["Christian Bale", "Heath Ledger"],
                year: "2008",
                platform: "HBO Max"
            },
            confidence: 0.98
        });

    } catch {
        return NextResponse.json({ error: 'Failed to analyze' }, { status: 500 });
    }
}
