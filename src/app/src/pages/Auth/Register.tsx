import React, { useState } from "react";
import { BasePage } from "../../components/BasePage/BasePage";
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
import Routes from "../../Routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegister, zRegister } from "../../services/models/IAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./auth.module.scss";
import { api } from "../../services/api/API";
import { Redirect, useHistory } from "react-router";
import { useAuth } from "../../services/storage/auth.store";

export const Register: React.FC = () => {
    const history = useHistory();
    const [present] = useIonToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<IRegister>({
        mode: "all",
        resolver: zodResolver(zRegister),
    });

    const [isLoggedIn] = useAuth((state) => [state.isLoggedIn]);

    console.log(form.formState.errors);

    const onSubmit: SubmitHandler<IRegister> = async (data) => {
        setIsLoading(true);
        try {
            const response = await api.auth.register(data);
            present({
                message: "You've created a new account successfully!",
                duration: 1000,
                position: "bottom",
                color: "success",
            });
            history.push("/auth/login");
        } catch (e) {
            console.log("eroare:", e);
        } finally {
            setIsLoading(false);
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
            title="Register"
            content={
                <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <IonGrid className="ion-padding">
                        <IonRow>
                            <IonCol className="mt-5 mb-2 ion-text-center">
                                <IonText className="fs-32 fw-700">
                                    Register
                                </IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow className="mt-5">
                            <IonCol size="12">
                                <IonInput
                                    mode="md"
                                    label="Username*"
                                    label-placement="floating"
                                    fill="outline"
                                    type="text"
                                    {...form.register("username")}
                                />
                                {form.formState.errors.username && (
                                    <IonText color="danger">
                                        {form.formState.errors.username.message}
                                    </IonText>
                                )}
                            </IonCol>
                            <IonCol className="mt-1" size="12">
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
                            <IonCol className="mt-1" size="12">
                                <IonInput
                                    mode="md"
                                    {...form.register("confirmPassword")}
                                    className={styles["custom-input"]}
                                    label="Confirm Password*"
                                    label-placement="floating"
                                    fill="outline"
                                    type="password"
                                    placeholder="Confirm Password*"
                                />
                                {form.formState.errors.confirmPassword && (
                                    <IonText color="danger">
                                        {
                                            form.formState.errors
                                                .confirmPassword.message
                                        }
                                    </IonText>
                                )}
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
                        form="register-form"
                        expand="block"
                        shape="round"
                        className="ion-padding mt-2"
                    >
                        Register
                    </IonButton>
                    <div className="ion-margin ion-padding-top">
                        <IonGrid>
                            <IonRow>
                                <IonCol className="ion-text-center">
                                    <IonText color="dark">
                                        Already have an account?
                                    </IonText>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="ion-text-center">
                                    <IonRouterLink routerLink={Routes.login}>
                                        <IonText
                                            className="text-underline"
                                            color="secondary"
                                        >
                                            Login now
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
