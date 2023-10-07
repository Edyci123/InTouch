import React from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import {
    IonButton,
    IonCol,
    IonGrid,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonRouterLink,
    IonRow,
    IonText,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import {
    IAccountSettings,
    zAccountSettings,
} from "../../services/models/IAccountSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobal } from "../../services/storage/global.store";

export const Settings: React.FC = () => {
    const [user] = useGlobal((state) => [state.user]);

    const form = useForm<IAccountSettings>({
        mode: "all",
        values: user ? user.account : undefined,
        resolver: zodResolver(zAccountSettings),
    });

    return (
        <BasePage
            title="Settings"
            content={
                <IonGrid className="ion-padding">
                    <IonRow className="mb-4">
                        <IonCol size="4">
                            <IonImg src="https://placehold.co/400x400" />
                        </IonCol>
                        <IonCol size="8">
                            <IonText className="centered fw-700">
                                {user?.email}
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow className="mb-4">
                        <IonCol size="12" className="grid-input">
                            <IonLabel className="fw-700 ion-margin-end">
                                Facebook:
                            </IonLabel>
                            <IonInput
                                {...form.register("facebookUsername")}
                                fill="outline"
                                mode="md"
                                type="text"
                            />
                        </IonCol>
                        <IonCol size="12" className="grid-input">
                            <IonLabel className="fw-700 ion-margin-end">
                                Instagram:
                            </IonLabel>
                            <IonInput
                                {...form.register("instagramUsername")}
                                fill="outline"
                                mode="md"
                                type="text"
                            />
                        </IonCol>
                        <IonCol size="12" className="grid-input">
                            <IonLabel className="fw-700 ion-margin-end">
                                Snapchat:
                            </IonLabel>
                            <IonInput
                                {...form.register("snapchatUsername")}
                                fill="outline"
                                mode="md"
                                type="text"
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton
                                fill="clear"
                                className="ion-no-padding ion-no-margin"
                            >
                                <IonText class="text-underline">
                                    Reset password
                                </IonText>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            }
            footer={
                <>
                    <IonButton
                        type="submit"
                        form="login-form"
                        expand="block"
                        shape="round"
                        className="ion-padding"
                    >
                        Update my accounts
                    </IonButton>
                </>
            }
        />
    );
};
