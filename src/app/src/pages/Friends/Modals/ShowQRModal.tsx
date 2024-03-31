import { IonContent, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import QRCode from "react-qr-code";
import { useGlobal } from "../../../services/storage/global.store";
import styles from "./QR.module.scss";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const QRModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [user] = useGlobal((state) => [state.user]);

    return (
        <IonModal
            mode="ios"
            isOpen={isOpen}
            className={styles["qr-modal"]}
            onIonModalDidDismiss={() => onClose()}
        >
            <IonContent scrollY={false}>
                <IonToolbar>
                    <IonTitle>QR</IonTitle>
                </IonToolbar>
                <div className="ion-padding">
                    <QRCode
                        className="w-100 h-100"
                        value={user ? user?.email : ""}
                    />
                </div>
            </IonContent>
        </IonModal>
    );
};
