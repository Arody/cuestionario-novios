import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ error: 'Username required' }), { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), `data/responses/${username}.json`);
    
    // Check if file exists
    try {
        await fs.access(filePath);
    } catch {
        // File doesn't exist, return empty object
        return new Response(JSON.stringify({}), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }

    const data = await fs.readFile(filePath, 'utf-8');
    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error reading progress' }), { status: 500 });
  }
};
