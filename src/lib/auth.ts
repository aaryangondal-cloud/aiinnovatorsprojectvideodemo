export interface User {
  email: string;
  name: string;
  createdAt: string;
}

const USERS_KEY = "gemcopy_users";
const CURRENT_USER_KEY = "gemcopy_current_user";

function getUsers(): Record<string, { name: string; password: string; createdAt: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function signUp(name: string, email: string, password: string): User | null {
  const users = getUsers();
  const key = email.toLowerCase().trim();
  if (users[key]) return null; // already exists
  const user: User = { email: key, name: name.trim(), createdAt: new Date().toISOString() };
  users[key] = { name: user.name, password, createdAt: user.createdAt };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export function signIn(email: string, password: string): User | null {
  const users = getUsers();
  const key = email.toLowerCase().trim();
  const record = users[key];
  if (!record || record.password !== password) return null;
  const user: User = { email: key, name: record.name, createdAt: record.createdAt };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function signOut(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}
