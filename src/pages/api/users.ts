import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const USERS_FILE = path.join(process.cwd(), 'data/users.json');

export const GET: APIRoute = async () => {
  try {
    const usersData = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(usersData);
    // Return users without passwords for security
    const safeUsers = users.map(({ password, ...user }: any) => user);
    
    return new Response(JSON.stringify(safeUsers), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error reading users' }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, password, role } = await request.json();

    if (!username || !password) {
        return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const usersData = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(usersData);

    if (users.find((u: any) => u.username === username)) {
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
    }

    const newUser = { username, password, role: role || 'user' };
    users.push(newUser);

    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true, user: { username, role: newUser.role } }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
  }
};
