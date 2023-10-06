import React, { useId, useState } from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import {
    IonButton,
    IonCol,
    IonFooter,
    IonGrid,
    IonInput,
    IonLoading,
    IonRouterLink,
    IonRow,
    IonText,
    IonTitle,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin, zLogin } from "../../services/models/IAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Routes from "../../Routes";
import styles from "./auth.module.scss";
import { api } from "../../services/api/API";
import { Redirect, Route, useHistory } from "react-router";
import { ErrorMessage } from "@hookform/error-message";
import { useAuth } from "../../services/storage/auth.store";
import { APIRoutes } from "../../services/api/APIRoutes";

export const Login: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const form = useForm<ILogin>({
        mode: "all",
        resolver: zodResolver(zLogin),
    });

    const [login, isLoggedIn] = useAuth((state) => [state.login, state.isLoggedIn]);

    console.log(form.formState.errors);

    const onSubmit: SubmitHandler<ILogin> = async (data) => {
        try {
            setLoading(true);
            const response = await api.auth.login(data);
            api.setToken(response.accessToken);
            login(response.accessToken);
            history.push("/home");
        } catch (e) {
            console.log("error: ", e);
            form.setError("password", {
                message: "The email or the password are incorrect!",
            });
        } finally {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Redirect to={Routes.home} />
    }

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
                                {form.formState.errors.email && (
                                    <IonText color="danger">
                                        {form.formState.errors.email.message}
                                    </IonText>
                                )}
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
                                {form.formState.errors.password && (
                                    <IonText color="danger">
                                        {form.formState.errors.password.message}
                                    </IonText>
                                )}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonLoading isOpen={loading} />
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