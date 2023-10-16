import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonFooter,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import classNames from "classnames";
import { add, qrCode } from "ionicons/icons";
import React from "react";

interface Props {
    content?: React.ReactNode;
    footer?: React.ReactNode;
    menu?: boolean;
    backButton?: boolean;
    title?: string;
    centeredContent?: boolean;
    noHeader?: boolean;
    scrollable?: boolean;
    customContent?: React.ReactNode;
}

export const BasePage: React.FC<Props> = ({
    content,
    centeredContent = false,
    footer,
    menu = true,
    backButton = true,
    noHeader = false,
    title,
    scrollable = true,
    customContent,
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
                <IonContent
                    scrollY={scrollable}
                    className={classNames("ion-padding")}
                >
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
            {customContent && customContent}
        </IonPage>
    );
};
