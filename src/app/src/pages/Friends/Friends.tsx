import {
    IonCol,
    IonFab,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import { FriendCard } from "./FriendCard";
import { add, qrCode } from "ionicons/icons";
import { ShowQRModal } from "./Modals/ShowQRModal";
import { Camera } from "@capacitor/camera";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

export const Friends: React.FC = () => {
    const [showQRModal, setShowQRModal] = useState(false);
    const [status, setStatus] = useState("accepted");
    const [friends, setFriends] = useState();

    let somehtign;

    const scanQRCode = async () => {
        await Camera.requestPermissions();
        const result = await BarcodeScanner.scan();
        console.log(result);
        somehtign = result;
    };

    console.log(status);

    return (
        <>
            <BasePage
                title="Your Friends"
                content={
                    <>
                        <IonSearchbar
                            animated
                            placeholder="Search for friends"
                            mode="ios"
                        />
                        <div className="ion-padding ion-margin-start ion-margin-end">
                            <IonSegment
                                value={status}
                                onChange={(e) => console.log(e)}
                            >
                                <IonSegmentButton
                                    value={"accepted"}
                                    onClick={() => setStatus("accepted")}
                                >
                                    Friends
                                </IonSegmentButton>
                                <IonSegmentButton
                                    value={"pending"}
                                    onClick={() => setStatus("pending")}
                                >
                                    Pending
                                </IonSegmentButton>
                                <IonSegmentButton
                                    value={"sent"}
                                    onClick={() => setStatus("sent")}
                                >
                                    Sent
                                </IonSegmentButton>
                            </IonSegment>
                        </div>
                        <IonGrid className="no-padding-grid">
                            <IonRow>
                                <IonCol size="6">
                                    <FriendCard />
                                </IonCol>
                                <IonCol size="6">
                                    <FriendCard />
                                </IonCol>
                                <IonCol size="6">
                                    <FriendCard />
                                </IonCol>
                                <IonCol size="6">
                                    <FriendCard />
                                </IonCol>
                                <IonCol size="6">
                                    <FriendCard />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonText>{somehtign}</IonText>
                        <IonFab slot="fixed" vertical="bottom" horizontal="end">
                            <IonFabButton onClick={() => scanQRCode()}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                        <IonFab
                            slot="fixed"
                            vertical="bottom"
                            horizontal="start"
                        >
                            <IonFabButton onClick={() => setShowQRModal(true)}>
                                <IonIcon icon={qrCode} />
                            </IonFabButton>
                        </IonFab>
                    </>
                }
            />
            <ShowQRModal
                isOpen={showQRModal}
                onClose={() => setShowQRModal(false)}
            />
        </>
    );
};
