import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import classNames from "classnames";
import React from "react";

interface Props {
    content?: React.ReactNode;
    footer?: React.ReactNode;
    menu?: boolean;
    backButton?: boolean;
    title?: string;
    centeredContent?: boolean;
    noHeader?: boolean;
}

export const BasePage: React.FC<Props> = ({
    content,
    centeredContent = false,
    footer,
    menu = true,
    backButton = true,
    noHeader = false,
    title,
}) => {
    return (
        <IonPage>
            {!noHeader && (
                <IonHeader>
                    <IonToolbar>
                        {backButton && (
                            <IonButtons slot="start">
                                <IonBackButton />
                            </IonButtons>
                        )}
                        <IonTitle>{title}</IonTitle>
                        {menu && <IonMenuButton autoHide={false} slot="end" />}
                    </IonToolbar>
                </IonHeader>
            )}
            {content && (
                <IonContent className="ion-padding">
                    <div
                        className={classNames({
                            centered: centeredContent,
                        })}
                    >
                        {content}
                    </div>
                </IonContent>
            )}
            {footer && (
                <IonFooter className="ion-padding ion-no-border no-shadows">
                    {footer}
                </IonFooter>
            )}
        </IonPage>
    );
};
