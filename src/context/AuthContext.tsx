import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export type Role = "admin" | "editor" | null;

interface AuthState {
  user: User | null;
  session: Session | null;
  role: Role;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

/**
 * Role is stored in the user's app_metadata (set server-side in Supabase),
 * so it can't be tampered with from the browser.
 */
function roleFromUser(user: User | null): Role {
  const r = user?.app_metadata?.role;
  if (r === "admin" || r === "editor") return r;
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    if (!supabase) return { error: "Login isn't configured yet." };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  const user = session?.user ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        role: roleFromUser(user),
        loading,
        configured: isSupabaseConfigured,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
