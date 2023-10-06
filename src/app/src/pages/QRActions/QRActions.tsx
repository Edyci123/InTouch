import React, { useState } from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import QRCode from "react-qr-code";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { IonButton, IonText } from "@ionic/react";
import { Camera } from '@capacitor/camera';


export const QRActions: React.FC = () => {
    const [scanned, setScanned] = useState("");

    const scanQRCode = async () => {
        await Camera.requestPermissions();
        const result = await BarcodeScanner.scan();
        console.log(result);
        setScanned(result.text);
    };
    

    return (
        <BasePage
            title="QR"
            content={
                <div className="ion-align-center">
                    <QRCode value="soemthing" />
                    <IonButton onClick={() => scanQRCode()}>Scan</IonButton>
                    <IonText>{scanned}</IonText>
                </div>
            }
        />
    );
};
