import {
    registerRequest,
    logInRequest,
    type fullUser, getMe
} from '../services/AuthService.ts';
import {
    createContext,
    useState,
    useContext,
    useEffect,
} from "react";

type halfUser = Omit<fullUser, 'token'>;
// KEYS
const TOKEN_KEY = 'lab_token';

const SESSION_KEY = 'lab_session';

// CONTEXT
type AuthContextValue = {
    user: halfUser | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    logIn: (username: string, password: string) => Promise<halfUser>;
    register: (username: string, password: string) => Promise<halfUser>;
    logout: () => void;
    getAuthHeader: () => Record<string, string>;
};
const empptyObject = {} as const;
type emptyObject = typeof empptyObject;
type authHeader = { Authorization: `Bearer ${string}` };

const AuthContext = createContext<null | AuthContextValue>(null);

export default function AuthProvider( {children} ){
    const [token, setToken] = useState<null | string>(null);
    const [user, setUser] = useState<null | halfUser>(null);
    // const [loading, setLoading] = useState<boolean>(() => {
    //     return localStorage.getItem(TOKEN_KEY) !== null;
    // });
    const [loading, setLoading] = useState<boolean>(true);

    function save(fUser: fullUser){
        const user: halfUser = {username: fUser.username, id: fUser.id}
        setUser(user);
        setToken(fUser.token);

        localStorage.setItem(TOKEN_KEY, fUser.token);
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));

    }

    // register
    async function register(username: string, password: string): Promise<halfUser>{
        const data = await registerRequest(username, password);
        save(data);

        return {
            username: data.username,
            id: data.id
        } satisfies halfUser;
    }

    // login
    async function logIn(username: string, password: string): Promise<halfUser>{
        const data = await logInRequest(username, password);
        save(data);

        return {
            username: data.username,
            id: data.id
        } satisfies halfUser;
    }

    // logout
    function logout(): void {
        setUser(null)
        setToken(null)
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(SESSION_KEY)
    }

    function getAuthHeader(): authHeader | emptyObject  {
        return token ? { Authorization: `Bearer ${token}` } : {}
    }


    useEffect(() => {
        const savedToken = localStorage.getItem(TOKEN_KEY);

        if (!savedToken){
            setLoading(false);
            return;
        }

        getMe(savedToken)
            .then( user => {
                const us: halfUser = {
                    username: user.username,
                    id: user.id ?? ""
                } satisfies halfUser;
                if (!us.id)  throw new Error(`Something went wrong during authentication`);
                setToken(savedToken);
                setUser(us);
            })
            .catch( () => {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(SESSION_KEY);

                setUser(null);
                setToken(null);
            })
            .finally( () => {
                setLoading(false)
            })

    }, []);

    //only null if authentication fails;
    const isAuthenticated = user !== null;

    const values: AuthContextValue = {
        user,
        token,
        isAuthenticated,
        loading,
        logIn,
        register,
        logout,
        getAuthHeader,
    };

    return (
        <AuthContext value={values}>
            {children}
        </AuthContext>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) throw new Error(`useAuth() must be used within AuthProvider`)
    return context;
}
