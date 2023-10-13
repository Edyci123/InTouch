import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonRow,
    IonText,
} from "@ionic/react";
import {
    close,
    link,
    logoFacebook,
    logoInstagram,
    logoSnapchat,
} from "ionicons/icons";
import React from "react";
import { FriendshipStatus, IFriends } from "../../services/models/IFriends";
import styles from "./friends.module.scss";
import classNames from "classnames";

interface Props {
    friend: IFriends;
    handleAcceptFriendRequest: () => void;
    handleReject: () => void;
    handleCancelFriendRequest: () => void;
}

export const FriendCard: React.FC<Props> = ({
    friend,
    handleAcceptFriendRequest,
    handleReject,
    handleCancelFriendRequest,
}) => {
    console.log(friend);

    return (
        <IonCard className="ion-no-padding m-1" button>
            <IonCardContent className="ion-no-padding ion-no-margin">
                <IonGrid>
                    <IonRow>
                        <IonCol size="5">
                            <IonImg src="https://placehold.co/400x400" />
                        </IonCol>
                        <IonCol size="7">
                            <div className="centered">
                                {friend.status === FriendshipStatus.sent && (
                                    <IonButton
                                        fill="clear"
                                        size="small"
                                        className={classNames(
                                            "ion-no-margin",
                                            styles["close-button"],
                                        )}
                                        onClick={() => handleCancelFriendRequest()}
                                    >
                                        <IonIcon icon={close} />
                                    </IonButton>
                                )}
                                <div></div>
                                <div>
                                    <IonText>{friend.username}</IonText>
                                </div>
                                <div>
                                    {friend.accounts?.snapchatUsername && (
                                        <IonIcon
                                            className="ion-margin-end"
                                            icon={logoSnapchat}
                                        />
                                    )}
                                    {friend.accounts?.instagramUsername && (
                                        <IonIcon
                                            className="ion-margin-end"
                                            icon={logoInstagram}
                                        />
                                    )}
                                    {friend.accounts?.facebookUsername && (
                                        <IonIcon icon={logoFacebook} />
                                    )}
                                </div>
                                {friend.status === FriendshipStatus.pending && (
                                    <div>
                                        <IonButton
                                            size="small"
                                            color="success"
                                            onClick={() =>
                                                handleAcceptFriendRequest()
                                            }
                                        >
                                            Accept
                                        </IonButton>
                                        <IonButton
                                            size="small"
                                            color="light"
                                            className="reject-text-color"
                                            onClick={() => handleReject()}
                                        >
                                            Reject
                                        </IonButton>
                                    </div>
                                )}
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};
