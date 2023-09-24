import {
    IonContent,
    IonIcon,
    IonItem,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonText
} from "@ionic/react";
import { home } from "ionicons/icons";
import React from "react";
import Routes from "../../Routes";

export const Menu: React.FC = () => {
    return (
        <IonMenu side="end" contentId="menu-content">
            <IonContent className="ion-padding">
                <IonMenuToggle>
                    <IonList>
                        <IonItem button routerLink={Routes.home}>
                            <IonIcon className="ion-margin-end" icon={home} />
                            <IonText>Home</IonText>
                        </IonItem>
                    </IonList>
                </IonMenuToggle>
            </IonContent>
        </IonMenu>
    );
};
