import React from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import { IonText } from "@ionic/react";
import { useForm } from "react-hook-form";
import { IAccountSettings, zAccountSettings } from "../../services/models/IAccountSettings";
import { zodResolver } from "@hookform/resolvers/zod";

export const Friends: React.FC = () => {

    return (
        <BasePage
            title="Your Friends"
            content={
                <IonText>Title</IonText>
            }
        />
    )
}