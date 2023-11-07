import { zodResolver } from "@hookform/resolvers/zod";
import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonInput,
    IonLoading,
    IonModal,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import classNames from "classnames";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    IForgotPassword,
    zForgotPassword,
} from "../../../services/models/IAuth";
import styles from "../auth.module.scss";
import { api } from "../../../services/api/API";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (code: string, newPassword: string) => void;
}

export const ForgotPassChangePassModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const form = useForm<IForgotPassword>({
        mode: "all",
        defaultValues: {},
        resolver: zodResolver(zForgotPassword),
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit: SubmitHandler<IForgotPassword> = async (data) => {
        try {
            setIsLoading(true);
            api.auth.resetPassword(data);
            onClose();
        } catch (e) {
            form.setError("code", { message: "Invalid code!" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <IonModal isOpen={isOpen} onIonModalDidDismiss={() => onClose()}>
            <IonHeader mode="md">
                <IonToolbar className="custom-toolbar">
                    <IonTitle className="w-100 ion-text-center fs-14">
                        Forgot Password
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <form id="change-pass">
                    <div className={classNames("d-flex ion-padding")}>
                        <div className="mt-2 mb-2 fw-700 fs-24">
                            <IonText color={"primary"}>
                                Enter the received code, then create a new
                                password for your account.
                            </IonText>
                        </div>
                    </div>
                    <div className={classNames("h-100 ion-padding")}>
                        <div className="mt-3">
                            <IonText className="fs-14">
                                Enter the code and the desired password
                            </IonText>
                        </div>

                        <IonInput
                            type="number"
                            className={classNames(
                                "mt-3 custom-input",
                                styles["code-input"]
                            )}
                            {...form.register("code")}
                            onIonInput={(e) => {
                                e.detail.value &&
                                    e.detail.value.length <= 4 &&
                                    form.setValue("code", e.detail.value);
                            }}
                        />
                        {form.formState.errors.code && (
                            <IonText color="danger">
                                {form.formState.errors.code.message}
                            </IonText>
                        )}

                        <IonInput
                            type="password"
                            className={classNames("mt-3 custom-input")}
                            {...form.register("password")}
                            onIonChange={(e) => {
                                e.detail.value &&
                                    form.setValue("password", e.detail.value);
                            }}
                            placeholder="Password"
                        />
                        {form.formState.errors.password && (
                            <IonText color="danger">
                                {form.formState.errors.password.message}
                            </IonText>
                        )}

                        <IonInput
                            type="password"
                            className={classNames("mt-3 custom-input")}
                            {...form.register("confirmPassword")}
                            onIonChange={(e) => {
                                e.detail.value &&
                                    form.setValue(
                                        "confirmPassword",
                                        e.detail.value
                                    );
                            }}
                            placeholder="Confirm Password"
                        />
                        {form.formState.errors.confirmPassword && (
                            <IonText color="danger">
                                {form.formState.errors.confirmPassword.message}
                            </IonText>
                        )}
                    </div>
                </form>
            </IonContent>
            <IonFooter className="ion-padding">
                <IonButton
                    expand="block"
                    shape="round"
                    className="fw-700"
                    type="submit"
                    form="change-pass"
                >
                    Next Step
                </IonButton>
            </IonFooter>
            <IonLoading isOpen={isLoading} />
        </IonModal>
    );
};
