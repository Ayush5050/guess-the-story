import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Proxy to Python Backend
        const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

        const response = await fetch(`${backendUrl}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            // Propagate backend errors if possible
            const errorText = await response.text();
            console.error("Backend Error:", errorText);
            return NextResponse.json({ error: 'Analysis failed from backend' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("API Proxy Error:", error);
        return NextResponse.json({ error: 'Failed to connect to analysis service' }, { status: 500 });
    }
}

