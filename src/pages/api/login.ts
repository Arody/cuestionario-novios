import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, password } = await request.json();

    const usersPath = path.join(process.cwd(), 'data/users.json');
    const usersData = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(usersData);

    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      return new Response(JSON.stringify({ 
        success: true, 
        username: user.username,
        role: user.role || 'user' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
