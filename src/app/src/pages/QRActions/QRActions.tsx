import React from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import QRCode from "react-qr-code";

export const QRActions: React.FC = () => {
    return (
        <BasePage
            title="QR"
            content={
                <div className="ion-align-center">
                    <QRCode value="soemthing" />
                </div>
            }
        />
    );
};
