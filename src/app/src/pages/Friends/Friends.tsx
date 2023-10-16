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
import { ISearchFriends, ISearchResult } from "../../services/api/FriendsAPI";

export const Friends: React.FC = () => {
    const [showQRModal, setShowQRModal] = useState(false);
    const [friendsRes, setFriendsRes] = useState<ISearchResult>();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchParams, setSearchParams] = useState<ISearchFriends>({
        email: "",
        status: FriendshipStatus.accepted,
        page: 0,
        size: 6,
    });

    const setStatus = (status: FriendshipStatus) => {
        setSearchParams({ ...searchParams, status });
    };

    const scanQRCode = async () => {
        await Camera.requestPermissions();
        const result = await BarcodeScanner.scan();
        await api.friends.sendFriendRequest(result.text);
        setStatus(FriendshipStatus.accepted);
    };

    useEffect(() => {
        api.friends.getFriendsByStatus(searchParams).then((res) => {
            setFriendsRes(res);
        });
    }, [setFriendsRes, searchParams]);

    const getEmptyArrayMessage = () => {
        switch (searchParams.status) {
            case FriendshipStatus.pending:
                return "There are no pending friend requests!";
            case FriendshipStatus.accepted:
                return "You have no friends here:(";
            case FriendshipStatus.sent:
                return "You have no sent friend requests!";
        }
    };

    const setFriends = (friends: IFriends[]) => {
        if (friendsRes) {
            setFriendsRes({ ...friendsRes, friends });
        }
    };

    const fetchOnScroll = (e: any) => {
        if (currentPage + 1 === friendsRes?.totalPages) {
            e.target.complete();
            return;
        }
        if (friendsRes) {
            setCurrentPage(currentPage + 1);
            api.friends
                .getFriendsByStatus({ ...searchParams, page: currentPage })
                .then((res) => {
                    setFriends(res.friends.concat(friendsRes?.friends));
                    e.target.complete();
                });
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
                            debounce={500}
                            placeholder="Search for friends"
                            mode="ios"
                            value={searchParams.email}
                            onIonInput={(e) => {
                                if (e.detail.value) {
                                    setSearchParams({
                                        ...searchParams,
                                        email: e.detail.value,
                                    });
                                } else {
                                    setSearchParams({
                                        ...searchParams,
                                        email: "",
                                    });
                                }
                                console.log(e.detail.value);
                            }}
                        />
                        <div className="ion-padding ion-margin-start ion-margin-end">
                            <IonSegment value={searchParams.status}>
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
                        <IonGrid className="no-padding-grid">
                            {friendsRes?.friends.length !== 0 ? (
                                friendsRes?.friends.map((friend, index) => (
                                    <IonRow key={index}>
                                        <IonCol size="12">
                                            <FriendCard
                                                friend={friend}
                                                handleAcceptFriendRequest={async () => {
                                                    await api.friends.acceptFriendRequest(
                                                        friend.id
                                                    );
                                                    setFriends(
                                                        friendsRes.friends.filter(
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
                                                        friendsRes.friends.filter(
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
                                                        friendsRes.friends.filter(
                                                            (val) =>
                                                                val !== friend
                                                        )
                                                    );
                                                }}
                                            />
                                        </IonCol>
                                    </IonRow>
                                ))
                            ) : (
                                <IonRow>
                                    <IonCol className="ion-text-center">
                                        <IonText>
                                            {getEmptyArrayMessage()}
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                            )}
                        </IonGrid>
                        <IonInfiniteScroll
                            threshold="100px"
                            onIonInfinite={(e) => {
                                setTimeout(() => {
                                    fetchOnScroll(e);
                                }, 500);
                            }}
                        >
                            <IonInfiniteScrollContent
                                loadingSpinner="bubbles"
                                loadingText="Loading more data..."
                            ></IonInfiniteScrollContent>
                        </IonInfiniteScroll>
                    </>
                }
                customContent={
                    <>
                        <IonFab slot="fixed" vertical="bottom" horizontal="end">
                            <IonFabButton onClick={() => scanQRCode()}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                        <IonFab vertical="bottom" horizontal="start">
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
