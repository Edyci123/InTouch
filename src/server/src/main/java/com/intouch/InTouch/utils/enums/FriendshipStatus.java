package com.intouch.InTouch.utils.enums;

public enum FriendshipStatus {
    SENT("sent"),
    PENDING("pending"),
    ACCEPTED("accepted");

    public final String label;

    private FriendshipStatus(String label) {
        this.label = label;
    }

    public static FriendshipStatus valueOfLabel(String label) {
        for (FriendshipStatus e : values()) {
            if (e.label.equals(label)) {
                return e;
            }
        }
        return null;
    }
}
