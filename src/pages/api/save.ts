import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, data } = await request.json();

    if (!username || !data) {
        return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
    }

    const filePath = path.join(process.cwd(), `data/responses/${username}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Save error:', error);
    return new Response(JSON.stringify({ error: 'Error saving progress' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
