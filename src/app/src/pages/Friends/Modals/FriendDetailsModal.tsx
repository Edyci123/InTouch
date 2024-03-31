import React from "react";
import { IFriends } from "../../../services/models/IFriends";
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonModal,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    useIonToast,
} from "@ionic/react";
import {
    logoFacebook,
    logoInstagram,
    logoSnapchat,
    mail,
} from "ionicons/icons";
import styles from "./modals.module.scss";
import { Clipboard } from "@capacitor/clipboard";

interface Props {
    friend: IFriends | null;
    isOpen: boolean;
    onClose: () => void;
}

export const FriendDetailsModal: React.FC<Props> = ({
    friend,
    isOpen,
    onClose,
}) => {
    const [present] = useIonToast();

    return (
        <IonModal
            className={styles["friend-details-modal"]}
            isOpen={isOpen}
            onIonModalDidDismiss={() => onClose()}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{friend?.username}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">
                            <IonButton
                                className="centered"
                                color="light"
                                onClick={async () => {
                                    await Clipboard.write({
                                        string: friend?.email,
                                    });
                                    present({
                                        message:
                                            "Copied email address to clipboard!",
                                        duration: 1000,
                                        position: "bottom",
                                        color: "light",
                                    });
                                }}
                            >
                                <IonIcon slot="icon-only" icon={mail} />
                            </IonButton>
                        </IonCol>
                        <IonCol size="6">
                            <IonButton
                                color="light"
                                className="centered"
                                disabled={
                                    friend?.accounts.facebookUsername === ""
                                }
                                onClick={async () => {
                                    await Clipboard.write({
                                        string: friend?.accounts
                                            .facebookUsername,
                                    });
                                    present({
                                        message:
                                            "Copied facebook username to clipboard!",
                                        duration: 1000,
                                        position: "bottom",
                                        color: "light",
                                    });
                                }}
                            >
                                <IonIcon slot="icon-only" icon={logoFacebook} />
                            </IonButton>
                        </IonCol>
                        <IonCol size="6">
                            <IonButton
                                className="centered"
                                color="light"
                                disabled={
                                    friend?.accounts.snapchatUsername === ""
                                }
                                onClick={async () => {
                                    await Clipboard.write({
                                        string: friend?.accounts
                                            .snapchatUsername,
                                    });
                                    present({
                                        message:
                                            "Copied snapchat username to clipboard!",
                                        duration: 1000,
                                        position: "bottom",
                                        color: "light",
                                    });
                                }}
                            >
                                <IonIcon slot="icon-only" icon={logoSnapchat} />
                            </IonButton>
                        </IonCol>
                        <IonCol size="6">
                            <IonButton
                                className="centered"
                                color="light"
                                disabled={
                                    friend?.accounts.instagramUsername === ""
                                }
                                onClick={async () => {
                                    await Clipboard.write({
                                        string: friend?.accounts
                                            .instagramUsername,
                                    });
                                    present({
                                        message:
                                            "Copied instagram username to clipboard!",
                                        duration: 1000,
                                        position: "bottom",
                                        color: "light",
                                    });
                                }}
                            >
                                <IonIcon
                                    slot="icon-only"
                                    icon={logoInstagram}
                                />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    );
};
