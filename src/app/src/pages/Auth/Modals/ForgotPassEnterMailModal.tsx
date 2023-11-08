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
import { api } from "../../../services/api/API";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    IForgotPassword,
    IForgotPasswordEmail,
    zForgotPassword,
    zForgotPasswordEmail,
} from "../../../services/models/IAuth";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
}

export const ForgotPassEnterMailModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const form = useForm<IForgotPasswordEmail>({
        mode: "all",
        resolver: zodResolver(zForgotPasswordEmail),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [present] = useIonToast();

    const handleSubmit: SubmitHandler<IForgotPasswordEmail> = async (data) => {
        try {
            setIsLoading(true);
            await api.auth.resetCode(data.email);
            present({
                message: "You've changed your password successfully!",
                duration: 1000,
                position: "bottom",
                color: "success",
            });
            form.reset();
            onSubmit(data.email);
            onClose();
        } catch (e) {
            console.log(e);
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
                <form
                    id="change-pass-email"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <div className={classNames("d-flex ion-padding")}>
                        <div className="mt-2 mb-2 fw-700 fs-24">
                            <IonText color={"primary"}>
                                Confirm your email address
                            </IonText>
                        </div>
                    </div>
                    <div className={classNames("h-100 ion-padding")}>
                        <div className="mt-3">
                            <IonText className="fs-14">
                                To change it, complete the input below and you
                                will be sent an email containing a
                                verficiation-code.
                            </IonText>
                        </div>

                        <IonInput
                            {...form.register("email")}
                            className={classNames("mt-4 custom-input")}
                            placeholder="Email"
                        />
                        {form.formState.errors.email && (
                            <IonText color="danger">
                                {form.formState.errors.email.message}
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
                    form="change-pass-email"
                >
                    Next Step
                </IonButton>
            </IonFooter>
            <IonLoading isOpen={isLoading} />
        </IonModal>
    );
};
