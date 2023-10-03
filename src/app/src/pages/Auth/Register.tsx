import React from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import {
    IonButton,
    IonCol,
    IonGrid,
    IonInput,
    IonRouterLink,
    IonRow,
    IonText,
} from "@ionic/react";
import Routes from "../../Routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegister, zRegister } from "../../services/models/IAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./auth.module.scss";
import { api } from "../../services/api/API";
import { useHistory } from "react-router";

export const Register: React.FC = () => {
    const history = useHistory();

    const form = useForm<IRegister>({
        mode: "all",
        resolver: zodResolver(zRegister),
    });

    console.log(form.formState.errors);

    const onSubmit: SubmitHandler<IRegister> = async (data) => {
        try {
            const response = await api.auth.register(data);
            history.push("/auth/login");
        } catch (e) {
            console.log("eroare:", e);
        }
    };

    return (
        <BasePage
            backButton={false}
            menu={false}
            noHeader={true}
            title="Login"
            content={
                <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <IonGrid className="ion-padding">
                        <IonRow>
                            <IonCol className="mt-5 mb-5 ion-text-center">
                                <IonText className="fs-32 fw-700">
                                    Register
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
                </form>
            }
            footer={
                <>
                    <IonButton
                        type="submit"
                        form="register-form"
                        expand="block"
                        shape="round"
                        className="ion-padding"
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
                                            Log in now
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
