import React from "react";
import { BasePage } from "../../components/BasePage/BasePage";
import { IonText } from "@ionic/react";

export const Home: React.FC = () => {
    return <BasePage title="Home" content={<IonText>Home!</IonText>} />;
};
