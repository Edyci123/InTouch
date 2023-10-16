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
import { SubmitHandler, useForm } from "react-hook-form";
import {
    IAccountSettings,
    zAccountSettings,
} from "../../services/models/IAccountSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobal } from "../../services/storage/global.store";
import { api } from "../../services/api/API";

export const Settings: React.FC = () => {
    const [user, setUser] = useGlobal((state) => [state.user, state.setUser]);

    console.log(user);

    const form = useForm<IAccountSettings>({
        mode: "all",
        values: user
            ? { username: user.username, accounts: user.accounts }
            : undefined,
        resolver: zodResolver(zAccountSettings),
    });

    const onSubmit: SubmitHandler<IAccountSettings> = async (data) => {
        try {
            const response = await api.auth.updateAccounts(data);
            if (user) {
                setUser({email: user.email, ...data });
            }
            console.log(response.status);
        } catch (error) {
            console.log("Update me error:", error);
        }
    };

    return (
        <BasePage
            title="Settings"
            content={
                <form id="settings-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                                    Username:
                                </IonLabel>
                                <IonInput
                                    {...form.register("username")}
                                    fill="outline"
                                    mode="md"
                                    type="text"
                                />
                            </IonCol>
                        </IonRow>

                        <IonRow className="mb-4">
                            <IonCol size="12" className="grid-input">
                                <IonLabel className="fw-700 ion-margin-end">
                                    Facebook:
                                </IonLabel>
                                <IonInput
                                    {...form.register(
                                        "accounts.facebookUsername"
                                    )}
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
                                    {...form.register(
                                        "accounts.instagramUsername"
                                    )}
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
                                    {...form.register(
                                        "accounts.snapchatUsername"
                                    )}
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
                </form>
            }
            footer={
                <>
                    <IonButton
                        type="submit"
                        form="settings-form"
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
