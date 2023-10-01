import React, { useState } from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import QRCode from "react-qr-code";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { IonButton } from "@ionic/react";

export const QRActions: React.FC = () => {

    const [scanned, setScanned] = useState('');

    const scanQRCode = async () => {
        const result = await BarcodeScanner.scan();
        console.log(result);
        setScanned(result.text);
    }

    return (
        <BasePage
            title="QR"
            content={
                <div className="ion-align-center">
                    <QRCode value="soemthing" />
                    <IonButton onClick={() => scanQRCode()}>Scan</IonButton>
                </div>
            }
        />
    );
};
