import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonInput,
    IonModal,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import classNames from "classnames";
import React, { useState } from "react";
import { api } from "../../../services/api/API";

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
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

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
                            To change it, complete the input below and you will
                            be sent an email containing a verficiation-code.
                        </IonText>
                    </div>

                    <IonInput
                        className={classNames("mt-4 custom-input")}
                        value={email}
                        onIonChange={(e) => {
                            e.detail.value && setEmail(e.detail.value);
                        }}
                        placeholder="Email"
                    />
                </div>
            </IonContent>
            <IonFooter className="ion-padding">
                <IonButton
                    expand="block"
                    shape="round"
                    className="fw-700"
                    onClick={async () => {
                        try {
                            await api.auth.resetCode(email);
                            onSubmit(email);
                            onClose();
                        } catch (e) {
                            setError(
                                "The email is not associated to any account!"
                            );
                        }
                    }}
                >
                    Next Step
                </IonButton>
            </IonFooter>
        </IonModal>
    );
};
