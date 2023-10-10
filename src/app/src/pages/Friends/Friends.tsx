import { IonCol, IonGrid, IonRow, IonSearchbar } from "@ionic/react";
import React from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import { FriendCard } from "./FriendCard";

export const Friends: React.FC = () => {
    return (
        <BasePage
            title="Your Friends"
            content={
                <>
                    <IonSearchbar
                        animated
                        placeholder="Search for friends"
                        mode="ios"
                    />
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
                </>
            }
        />
    );
};
