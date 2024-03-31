import { create } from "zustand";
import { IUser } from "../models/IUser";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface GlobalState {
    user?: IUser;
}

interface GlobalActions {
    setUser: (user: IUser) => void;
}

const intialState: GlobalState = {
    user: undefined,
};

export const useGlobal = create<GlobalState & GlobalActions>()(
    persist(
        immer((set) => ({
            ...intialState,
            setUser: (user) => {
                set(() => ({ user }));
            },
        })),
        {
            name: "intouch.global",
        }
    )
);
