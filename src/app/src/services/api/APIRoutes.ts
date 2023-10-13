import axios, { Axios } from "axios";

export const APIRoutes = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        me: "/me",
        updateAccounts: "/me/update",
    },
    friends: {
        getByStatus: "/friends/{{status}}",
        deleteFriendship: "/friends/delete/{{userId}}",
        acceptFriendRequest: "/friends/accept/{{userId}}",
        sendFriendRequests: "/friends/send",
    },
};
