package com.intouch.InTouch.utils.enums;

public enum FriendshipStatus {
    SENT("SENT"),
    PENDING("PENDING"),
    ACCEPTED("ACCEPTED");

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
