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
import styles from "../auth.module.scss";

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
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    console.log(code);

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
                            Enter the code and the desired password
                        </IonText>
                    </div>

                    <IonInput
                        type="number"
                        className={classNames(
                            "mt-3 custom-input",
                            styles["code-input"]
                        )}
                        value={code}
                        onIonInput={(e) => {
                            e.detail.value &&
                                e.detail.value.length <= 4 &&
                                setCode(e.detail.value);
                        }}
                    />

                    <IonInput
                        type="password"
                        className={classNames("mt-3 custom-input")}
                        value={newPassword}
                        onIonChange={(e) => {
                            e.detail.value && setNewPassword(e.detail.value);
                        }}
                        placeholder="Password"
                    />

                    <IonInput
                        type="password"
                        className={classNames("mt-3 custom-input")}
                        value={newPassword}
                        onIonChange={(e) => {
                            e.detail.value && setNewPassword(e.detail.value);
                        }}
                        placeholder="Confirm Password"
                    />
                </div>
            </IonContent>
            <IonFooter className="ion-padding">
                <IonButton
                    expand="block"
                    shape="round"
                    className="fw-700"
                    onClick={() => {
                        onSubmit(code, newPassword);
                        onClose();
                    }}
                >
                    Next Step
                </IonButton>
            </IonFooter>
        </IonModal>
    );
};
