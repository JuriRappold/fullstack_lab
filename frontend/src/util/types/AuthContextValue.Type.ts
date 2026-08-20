import type {
    halfUser
} from './Frontend.User.Type.ts';
export type AuthContextValue = {
    user: halfUser | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    logIn: (username: string, password: string) => Promise<halfUser>;
    register: (username: string, password: string) => Promise<halfUser>;
    logout: () => void;
    getAuthHeader: () => Record<string, string>;
};

