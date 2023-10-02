import React, { useId } from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import {
    IonButton,
    IonCol,
    IonFooter,
    IonGrid,
    IonInput,
    IonRouterLink,
    IonRow,
    IonText,
    IonTitle,
} from "@ionic/react";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { IAuth, zAuth } from "../../services/models/IAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Routes from "../../Routes";
import styles from "./auth.module.scss";
import { api } from "../../services/api/API";

export const LoginPage: React.FC = () => {
    const form = useForm<IAuth>({
        mode: "all",
        resolver: zodResolver(zAuth),
    });

    console.log(form.formState.errors);

    const onSubmit: SubmitHandler<IAuth> = async (data) => {
        const res = await api.auth.login(data);
        api.setToken(res.accessToken);        
    };

    return (
        <BasePage
            backButton={false}
            menu={false}
            noHeader={true}
            title="Login"
            content={
                <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <IonGrid className="ion-padding">
                        <IonRow>
                            <IonCol className="mt-5 mb-5 ion-text-center">
                                <IonText className="fs-32 fw-700">
                                    Login
                                </IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow className="mt-5">
                            <IonCol size="12">
                                <IonInput
                                    mode="md"
                                    label="Email*"
                                    label-placement="floating"
                                    fill="outline"
                                    type="text"
                                    //placeholder="Email*"
                                    {...form.register("email")}
                                />
                            </IonCol>
                            <IonCol className="mt-1" size="12">
                                <IonInput
                                    mode="md"
                                    {...form.register("password")}
                                    className={styles["custom-input"]}
                                    label="Password*"
                                    label-placement="floating"
                                    fill="outline"
                                    type="password"
                                    placeholder="Password*"
                                />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </form>
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
                        Login
                    </IonButton>
                    <div className="ion-margin ion-padding-top">
                        <IonGrid>
                            <IonRow>
                                <IonCol className="ion-text-center">
                                    <IonText color="dark">
                                        Don’t have an account yet?
                                    </IonText>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="ion-text-center">
                                    <IonRouterLink routerLink={Routes.register}>
                                        <IonText
                                            className="text-underline"
                                            color="secondary"
                                        >
                                            Create one now
                                        </IonText>
                                    </IonRouterLink>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                </>
            }
        />
    );
};
