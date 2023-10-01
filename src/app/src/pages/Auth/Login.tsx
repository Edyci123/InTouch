import React from "react";
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
import styles from "./auth.module.scss"

export const LoginPage: React.FC = () => {
    const form = useForm<IAuth>({
        mode: "all",
        resolver: zodResolver(zAuth),
    });

    const onSubmit: SubmitHandler<IAuth> = async (data) => {};

    return (
        <BasePage
            backButton={false}
            menu={false}
            noHeader={true}
            title="Login"
            content={
                <form onSubmit={() => form.handleSubmit(onSubmit)}>
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
                                    label="Email"
                                    color="primary" 
                                    label-placement="floating"
                                    fill="outline"
                                    type="password"
                                    placeholder="Email*"
                                    {...form.register("email")}
                                />
                            </IonCol>
                            <IonCol className="mt-1" size="12">
                                <IonInput
                                    {...form.register("password")}
                                    label="Password" 
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
                    <IonButton type="submit" expand="block" shape="round">
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
