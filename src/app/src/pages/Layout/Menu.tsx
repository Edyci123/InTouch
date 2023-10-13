import {
    IonContent,
    IonFab,
    IonFooter,
    IonIcon,
    IonItem,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonText,
} from "@ionic/react";
import { home, logOut, people, scan, settings } from "ionicons/icons";
import React from "react";
import Routes from "../../Routes";
import { useAuth } from "../../services/storage/auth.store";

export const Menu: React.FC = () => {
    const [logout] = useAuth((state) => [state.logout]);

    return (
        <IonMenu side="end" contentId="menu-content">
            <IonContent className="ion-padding">
                <IonMenuToggle>
                    <IonList>
                        <IonItem button routerLink={Routes.home}>
                            <IonIcon className="ion-margin-end" icon={home} />
                            <IonText>Home</IonText>
                        </IonItem>
                        <IonItem button routerLink={Routes.friends}>
                            <IonIcon className="ion-margin-end" icon={people} />
                            <IonText>Friends</IonText>
                        </IonItem>
                    </IonList>
                </IonMenuToggle>
            </IonContent>
            <IonFooter className="ion-padding ion-no-border no-shadows">
                <IonMenuToggle>
                    <IonList>
                        <IonItem button routerLink={Routes.settings}>
                            <IonIcon
                                className="ion-margin-end"
                                icon={settings}
                            />
                            <IonText>Settings</IonText>
                        </IonItem>
                        <IonItem
                            button
                            onClick={() => logout()}
                            routerLink={Routes.login}
                        >
                            <IonIcon className="ion-margin-end" icon={logOut} />
                            <IonText>Logout</IonText>
                        </IonItem>
                    </IonList>
                </IonMenuToggle>
            </IonFooter>
        </IonMenu>
    );
};
