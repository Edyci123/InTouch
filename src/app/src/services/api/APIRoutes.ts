export const APIRoutes = {
	auth: {
		login: "/auth/login",
		register: "/auth/register",
		accountExists: "/auth/account/exists",
		resetCode: "/auth/reset/code",
		resetPassword: "/auth/reset/password",
	},
    users: {
        me: "/users/me",
		updateAccounts: "/users/me/update",
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
