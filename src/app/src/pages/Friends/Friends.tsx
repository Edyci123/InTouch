import {
    IonCol,
    IonFab,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonList,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import { FriendCard } from "./FriendCard";
import { add, qrCode } from "ionicons/icons";
import { ShowQRModal } from "./Modals/ShowQRModal";
import { Camera } from "@capacitor/camera";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { api } from "../../services/api/API";
import { FriendshipStatus, IFriends } from "../../services/models/IFriends";

interface SearchParams {
    search: string;
    page: 0;
    size: 6;
}

export const Friends: React.FC = () => {
    const [showQRModal, setShowQRModal] = useState(false);
    const [status, setStatus] = useState(FriendshipStatus.accepted);
    const [friends, setFriends] = useState<IFriends[]>([]);
    const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

    const scanQRCode = async () => {
        await Camera.requestPermissions();
        const result = await BarcodeScanner.scan();
        await api.friends.sendFriendRequest(result.text);
        setStatus(FriendshipStatus.accepted);
    };

    useEffect(() => {}, [setFriends, status]);

    const getEmptyArrayMessage = () => {
        switch (status) {
            case FriendshipStatus.pending:
                return "There are no pending friend requests!";
            case FriendshipStatus.accepted:
                return "You have no friends here:(";
            case FriendshipStatus.sent:
                return "You have no sent friend requests!";
        }
    };

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
                                    value={FriendshipStatus.accepted}
                                    onClick={() =>
                                        setStatus(FriendshipStatus.accepted)
                                    }
                                >
                                    Friends
                                </IonSegmentButton>
                                <IonSegmentButton
                                    value={FriendshipStatus.pending}
                                    onClick={() =>
                                        setStatus(FriendshipStatus.pending)
                                    }
                                >
                                    Pending
                                </IonSegmentButton>
                                <IonSegmentButton
                                    value={FriendshipStatus.sent}
                                    onClick={() =>
                                        setStatus(FriendshipStatus.sent)
                                    }
                                >
                                    Sent
                                </IonSegmentButton>
                            </IonSegment>
                        </div>
                        <IonList lines="none" className="no-padding-grid">
                            {friends.length !== 0 ? (
                                friends.map((friend, index) => (
                                    <IonItem>
                                        <IonCol key={index} size="12">
                                            <FriendCard
                                                friend={friend}
                                                handleAcceptFriendRequest={async () => {
                                                    await api.friends.acceptFriendRequest(
                                                        friend.id
                                                    );
                                                    setFriends(
                                                        friends.filter(
                                                            (val) =>
                                                                val !== friend
                                                        )
                                                    );
                                                }}
                                                handleReject={async () => {
                                                    await api.friends.deleteFriendship(
                                                        friend.id
                                                    );
                                                    setFriends(
                                                        friends.filter(
                                                            (val) =>
                                                                val !== friend
                                                        )
                                                    );
                                                }}
                                                handleCancelFriendRequest={async () => {
                                                    await api.friends.deleteFriendship(
                                                        friend.id
                                                    );
                                                    setFriends(
                                                        friends.filter(
                                                            (val) =>
                                                                val !== friend
                                                        )
                                                    );
                                                }}
                                            />
                                        </IonCol>
                                    </IonItem>
                                ))
                            ) : (
                                <IonItem>
                                    <IonCol className="ion-text-center">
                                        <IonText>
                                            {getEmptyArrayMessage()}
                                        </IonText>
                                    </IonCol>
                                </IonItem>
                            )}
                        </IonList>
                        <IonInfiniteScroll
                            threshold="100px"
                            onIonInfinite={(e) => {
                                setTimeout(() => {
                                    api.friends
                                        .getFriendsByStatus(status)
                                        .then((res) => {
                                            setFriends(
                                                res.friends.concat(friends)
                                            );
                                            e.target.complete();
                                        });
                                }, 500);
                            }}
                        >
                            <IonInfiniteScrollContent
                                loadingSpinner="bubbles"
                                loadingText="Loading more data..."
                            ></IonInfiniteScrollContent>
                        </IonInfiniteScroll>
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
