import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ForgotPassState {
    email: string;
}

interface ForgotPassActions {
    setEmail: (email: string) => void;
}

const initialState: ForgotPassState = {
    email: "",
};

export const useForgotPass = create<ForgotPassState & ForgotPassActions>()(
    persist(
        immer((set) => ({
            ...initialState,
            setEmail: (email) => {
                set(() => {
                    return { email };
                });
            },
        })),
        {
            name: "intouch.forgot_pass",
        }
    )
);
