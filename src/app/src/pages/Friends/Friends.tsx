import { Camera } from "@capacitor/camera";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import {
	IonCol,
	IonFab,
	IonFabButton,
	IonGrid,
	IonIcon,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonRow,
	IonSearchbar,
	IonSegment,
	IonSegmentButton,
	IonText,
	useIonToast,
} from "@ionic/react";
import { add, qrCode } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import { api } from "../../services/api/API";
import { ISearchFriends, ISearchResult } from "../../services/api/FriendsAPI";
import { FriendshipStatus, IFriends } from "../../services/models/IFriends";
import { FriendCard } from "./FriendCard";
import { QRModal } from "./Modals/QRModal";
import { FriendDetailsModal } from "./Modals/FriendDetailsModal";

export const Friends: React.FC = () => {
	const [present] = useIonToast();
	const [isLoading, setIsLoading] = useState(false);

	const [showQRModal, setShowQRModal] = useState(false);
	const [friendDetailsModal, setFriendDetailsModal] = useState<IFriends | null>(null);

	const [friendsRes, setFriendsRes] = useState<ISearchResult>();
	const [currentPage, setCurrentPage] = useState(0);
	const [searchParams, setSearchParams] = useState<ISearchFriends>({
		username: "",
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
		setIsLoading(true);
		try {
			api.friends.getFriendsByStatus(searchParams).then((res) => {
				setFriendsRes(res);
			});
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
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
			present({
				duration: 1000,
				message: "No more friends to retrieve!",
				position: "bottom",
			});
			return;
		}
		if (friendsRes) {
			setCurrentPage(currentPage + 1);
			try {
				api.friends.getFriendsByStatus({ ...searchParams, page: currentPage }).then((res) => {
					setFriends(res.friends.concat(friendsRes?.friends));
					e.target.complete();
				});
			} catch (e) {
				console.log(e);
			}
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
							value={searchParams.username}
							onIonInput={(e) => {
								if (e.detail.value) {
									setSearchParams({
										...searchParams,
										username: e.detail.value,
									});
								} else {
									setSearchParams({
										...searchParams,
										username: "",
									});
								}
								console.log(e.detail.value);
							}}
						/>
						<div className="ion-padding ion-margin-start ion-margin-end">
							<IonSegment mode="ios" value={searchParams.status}>
								<IonSegmentButton value={FriendshipStatus.accepted} onClick={() => setStatus(FriendshipStatus.accepted)}>
									Friends
								</IonSegmentButton>
								<IonSegmentButton value={FriendshipStatus.pending} onClick={() => setStatus(FriendshipStatus.pending)}>
									Pending
								</IonSegmentButton>
								<IonSegmentButton value={FriendshipStatus.sent} onClick={() => setStatus(FriendshipStatus.sent)}>
									Sent
								</IonSegmentButton>
							</IonSegment>
						</div>
						<IonGrid className="no-padding-grid">
							{friendsRes?.friends.length !== 0 ? (
								friendsRes?.friends.map((friend, index) => (
									<IonRow key={index}>
										<IonCol key={index} size="12">
											<FriendCard
												friend={friend}
												handleClick={() => {
													setFriendDetailsModal(friend);
												}}
												handleAcceptFriendRequest={async () => {
													await api.friends.acceptFriendRequest(friend.id);
													present({
														duration: 1000,
														message: `You've just accepted,${friend.username}'s friend request!`,
														color: "success",
														position: "bottom",
													});
													setFriends(friendsRes.friends.filter((val) => val !== friend));
												}}
												handleReject={async () => {
													await api.friends.deleteFriendship(friend.id);
													present({
														duration: 1000,
														message: `You've just rejected,${friend.username}'s friend request!`,
														color: "warning",
														position: "bottom",
													});
													setFriends(friendsRes.friends.filter((val) => val !== friend));
												}}
												handleCancelFriendRequest={async () => {
													await api.friends.deleteFriendship(friend.id);
													present({
														duration: 1000,
														message:
															friend.status === FriendshipStatus.sent
																? `You've just deleted a friend request!`
																: `You've just unfriended ${friend.username}`,
														color: "warning",
														position: "bottom",
													});
													setFriends(friendsRes.friends.filter((val) => val !== friend));
												}}
											/>
										</IonCol>
									</IonRow>
								))
							) : (
								<IonRow>
									<IonCol className="ion-text-center">
										<IonText>{getEmptyArrayMessage()}</IonText>
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
							<IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data..."></IonInfiniteScrollContent>
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
			<QRModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
			<FriendDetailsModal friend={friendDetailsModal} onClose={() => setFriendDetailsModal(null)} isOpen={!!friendDetailsModal} />
		</>
	);
};
