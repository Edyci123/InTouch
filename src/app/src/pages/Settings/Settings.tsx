import React, { useState } from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import {
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonRouterLink,
    IonRow,
    IonText,
    useIonToast,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    IAccountSettings,
    zAccountSettings,
} from "../../services/models/IAccountSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobal } from "../../services/storage/global.store";
import { api } from "../../services/api/API";
import { camera } from "ionicons/icons";
import styles from "./settings.module.scss";
import { Camera, CameraResultType } from "@capacitor/camera";

export const Settings: React.FC = () => {
    const [user, setUser] = useGlobal((state) => [state.user, state.setUser]);
    const [present] = useIonToast();
    const [isLoading, setIsLoading] = useState(false);

    console.log(user);

    const form = useForm<IAccountSettings>({
        mode: "all",
        values: user
            ? { username: user.username, accounts: user.accounts }
            : undefined,
        resolver: zodResolver(zAccountSettings),
    });

    const onSubmit: SubmitHandler<IAccountSettings> = async (data) => {
        setIsLoading(true);
        try {
            const response = await api.auth.updateAccounts(data);
            if (user) {
                setUser({
                    email: user.email,
                    photoUri: user.photoUri,
                    ...data,
                });
            }
            present({
                message: "Account updated!",
                duration: 1000,
                position: "bottom",
                color: "success",
            });
            console.log(response.status);
        } catch (error) {
            console.log("Update me error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCamera = async () => {
        await Camera.requestPermissions();
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri,
        });
        if (image.webPath) {
            setIsLoading(true);
            let blob = await fetch(image.webPath).then((r) => r.blob());
            let formData = new FormData();
            formData.append("file", blob);
            await api.files.uploadFile(formData);
            await api.auth.me().then((response) => setUser(response));
            present({
                message: "Account updated!",
                duration: 1000,
                position: "bottom",
                color: "success",
            });
            setIsLoading(false);
        }
        console.log(image);
    };

    return (
        <BasePage
            title="Settings"
            content={
                <form id="settings-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <IonGrid className="ion-padding">
                        <IonRow className="mb-4">
                            <IonCol className="ion-no-padding" size="4">
                                <div>
                                    <div className={styles["image-container"]}>
                                        <img
                                            className={styles["user-image"]}
                                            src={
                                                user?.photoUri
                                                    ? "http://192.168.1.133:8080/api" +
                                                      user?.photoUri
                                                    : "https://placehold.co/500x400"
                                            }
                                        />
                                    </div>
                                    <IonIcon
                                        style={{ zIndex: 9999 }}
                                        className={styles["change-photo-icon"]}
                                        slot="icon-only"
                                        icon={camera}
                                        onClick={() => handleCamera()}
                                    />
                                </div>
                            </IonCol>
                            <IonCol size="8">
                                <IonText className="centered fw-700">
                                    {user?.email}
                                </IonText>
                            </IonCol>
                        </IonRow>

                        <IonRow className="mb-4">
                            <IonCol className="grid-input" size="12">
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
                            {form.formState.errors.username && (
                                <IonText color="danger">
                                    {form.formState.errors.username.message}
                                </IonText>
                            )}
                        </IonRow>

                        <IonRow className="mb-4">
                            <IonCol size="12" className="grid-input">
                                <IonLabel className="fw-700 ion-margin-end">
                                    Facebook:
                                </IonLabel>
                                <IonInput
                                    className="ion-float-end"
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
                    <IonLoading isOpen={isLoading} />
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
