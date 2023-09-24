import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";

interface Props {
    content?: React.ReactNode;
    footer?: React.ReactNode;
    menu?: boolean;
    backButton?: boolean;
    title?: string;
}

export const BasePage: React.FC<Props> = ({
    content,
    footer,
    menu = true,
    backButton = true,
    title,
}) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {backButton && (
                        <IonButtons slot="start">
                            <IonBackButton />
                        </IonButtons>
                    )}
                    <IonTitle>{title}</IonTitle>
                    {<IonMenuButton autoHide={false} slot="end" />}
                </IonToolbar>
            </IonHeader>
            {content && <IonContent class="ion-padding">{content}</IonContent>}
            {footer && <IonFooter>{footer}</IonFooter>}
        </IonPage>
    );
};
