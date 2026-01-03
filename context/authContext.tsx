import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useStorageState } from "@/hooks/storage";
import { env } from "@/utils/env/env";
import axios from "axios";

export type User = {
  id: string;
  email: string;
  username: string;
};

export type UpdateUser = {
  email: string;
  username: string;
};

export type Session = { accessToken: string; refreshToken: string };

type Login = { email: string; otp: string };

type AuthContextType = {
  login: (data: Login) => Promise<void>;
  signOut: () => Promise<void>;
  error: Error | undefined;
  session?: Session | null;
  updateSession: (tokens: Session) => void;
};

type Error = { message: string; code: number };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (value === null) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: PropsWithChildren) {
  const [[, session], setSession] = useStorageState("session");
  const [error] = useState<Error | undefined>(undefined);
  const queryClient = useQueryClient();

  return (
    <AuthContext.Provider
      value={{
        login: async (body: Login) => {
          return await axios
            .post(`${env.api.baseUrl}/auth/login`, {
              ...body,
            })
            .then((res) => {
              setSession(JSON.stringify(res.data as Session));
            })
            .catch((err) => {
              console.error(err);
            });
        },
        signOut: async () => {
          setSession(null);
          queryClient.removeQueries();
        },
        session: session ? JSON.parse(session) : null,
        updateSession: (tokens: Session) => {
          setSession(JSON.stringify(tokens));
        },
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
