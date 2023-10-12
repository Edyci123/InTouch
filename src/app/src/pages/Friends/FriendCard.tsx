import {
    IonCard,
    IonCardContent,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonRow,
    IonText,
} from "@ionic/react";
import { logoFacebook, logoInstagram, logoSnapchat } from "ionicons/icons";
import React from "react";
import { IFriends } from "../../services/models/IFriends";

interface Props {
    friend: IFriends;
}

export const FriendCard: React.FC<Props> = ({friend}) => {
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
                                <div>
                                    <IonText>{friend.email}</IonText>
                                </div>
                                <div>
                                    <IonIcon
                                        className="ion-margin-end"
                                        icon={logoSnapchat}
                                    />
                                    <IonIcon
                                        className="ion-margin-end"
                                        icon={logoInstagram}
                                    />
                                    <IonIcon icon={logoFacebook} />
                                </div>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};
