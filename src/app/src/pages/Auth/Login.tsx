import { zodResolver } from "@hookform/resolvers/zod";
import {
    IonButton,
    IonCol,
    IonGrid,
    IonInput,
    IonLoading,
    IonRouterLink,
    IonRow,
    IonText,
    useIonToast,
} from "@ionic/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router";
import Routes from "../../Routes";
import { BasePage } from "../../components/BasePage/BasePage";
import { api } from "../../services/api/API";
import { ILogin, zLogin } from "../../services/models/IAuth";
import { useAuth } from "../../services/storage/auth.store";
import styles from "./auth.module.scss";
import classNames from "classnames";
import { ForgotPassEnterMailModal } from "./Modals/ForgotPassEnterMailModal";
import { ForgotPassChangePassModal } from "./Modals/ForgotPassChangePassModal";
import { useForgotPass } from "./fogotPassword.store";

export const Login: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [present] = useIonToast();

    const [forgotPassStep1Modal, setForgotPassStep1Modal] = useState(false);
    const [forgotPassStep2Modal, setForgotPassStep2Modal] = useState(false);
    const setEmail = useForgotPass((state) => state.setEmail);

    const form = useForm<ILogin>({
        mode: "all",
        resolver: zodResolver(zLogin),
    });

    const [login, isLoggedIn] = useAuth((state) => [
        state.login,
        state.isLoggedIn,
    ]);

    console.log(form.formState.errors);

    const onSubmit: SubmitHandler<ILogin> = async (data) => {
        try {
            setLoading(true);
            const response = await api.auth.login(data);
            api.setToken(response.accessToken);
            login(response.accessToken);
            present({
                message: "You've been logged in successfully!",
                duration: 1000,
                position: "bottom",
                color: "success",
            });
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
        return <Redirect to={Routes.home} />;
    }

    return (
        <BasePage
            backButton={false}
            menu={false}
            noHeader={true}
            title="Login"
            //scrollable={false}
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
                        <IonRow className="mt-2">
                            <IonCol>
                                <IonButton
                                    fill="clear"
                                    className={classNames(
                                        "fs-14 p-0 color-dark-grey text-underline",
                                        styles["forgot-password-button"]
                                    )}
                                    onClick={() =>
                                        setForgotPassStep1Modal(true)
                                    }
                                >
                                    Forgot your password?
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonLoading isOpen={loading} />

                    <ForgotPassEnterMailModal
                        isOpen={forgotPassStep1Modal}
                        onClose={() => setForgotPassStep1Modal(false)}
                        onSubmit={(email) => {
                            setForgotPassStep2Modal(true);
                            setEmail(email);
                        }}
                    />

                    <ForgotPassChangePassModal
                        isOpen={forgotPassStep2Modal}
                        onClose={() => setForgotPassStep2Modal(false)}
                    />
                </form>
            }
            footer={
                <>
                    <IonButton
                        type="submit"
                        form="login-form"
                        expand="block"
                        shape="round"
                        className="ion-padding mt-4"
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
