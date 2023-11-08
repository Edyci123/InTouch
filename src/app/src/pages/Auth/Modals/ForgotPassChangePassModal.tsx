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
    useIonToast,
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
import { useForgotPass } from "../fogotPassword.store";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const ForgotPassChangePassModal: React.FC<Props> = ({
    isOpen,
    onClose,
}) => {
    const [email, setEmail] = useForgotPass((state) => [
        state.email,
        state.setEmail,
    ]);
    const [present] = useIonToast();

    const form = useForm<IForgotPassword>({
        mode: "all",
        values: { email: email, code: "", password: "", confirmPassword: "" },
        resolver: zodResolver(zForgotPassword),
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit: SubmitHandler<IForgotPassword> = async (data) => {
        try {
            setIsLoading(true);
            await api.auth.resetPassword(data);
            present({
                message: "You've changed your password successfully!",
                duration: 1000,
                position: "bottom",
                color: "success",
            });
            handleClose();
        } catch (e) {
            form.setError("code", { message: "Invalid code!" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setEmail("");
        form.reset();
        onClose();
    };

    return (
        <IonModal isOpen={isOpen} onIonModalDidDismiss={() => handleClose()}>
            <IonHeader mode="md">
                <IonToolbar className="custom-toolbar">
                    <IonTitle className="w-100 ion-text-center fs-14">
                        Forgot Password
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <form
                    id="change-pass"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
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
