import axios, { Axios } from "axios";

export const APIRoutes = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        me: "/me",
        updateAccounts: "/me/update",
        accountExists: "/auth/exists",
        resetCode: "/reset/code",
        resetPassword: "/reset/password",
    },
    friends: {
        getFriends: "/friends/{{status}}",
        deleteFriendship: "/friends/delete/{{userId}}",
        acceptFriendRequest: "/friends/accept/{{userId}}",
        sendFriendRequests: "/friends/send",
    },
    files: {
        upload: "/files/upload",
    },
};
