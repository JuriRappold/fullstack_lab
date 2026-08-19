export const BASE = "http://127.0.0.1:3001/api" as const;
// export const BASE = import.meta.env.BASE_URL ?? '';
export const projectURL = `${BASE}/projects` as const;
export const updateURL = `${BASE}/update` as const;
export const userURL = `${BASE}/user` as const;

