import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
    isLoggedIn: boolean;
    token: string;
}

interface AuthActions {
    login: (token: string) => void;
    logout: () => void;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: "",
};

export const useAuth = create<AuthState & AuthActions>()(
    persist(
        immer((set) => ({
            ...initialState,
            login: (token) => {
                set(() => {
                    return { isLoggedIn: true, token: token };
                });
            },
            logout: () => {
                set(() => {
                    return { isLoggedIn: false, token: "" };
                });
            },
        })),
        {
            name: "intouch.auth",
        }
    )
);
