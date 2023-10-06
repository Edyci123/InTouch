import React from "react";
import { useAuth } from "./services/storage/auth.store";
import { Redirect, Route, Router } from "react-router";
import { APIRoutes } from "./services/api/APIRoutes";
import { IonRouterOutlet } from "@ionic/react";
import Routes from "./Routes";
import { Home } from "./pages/Home/Home";
import { QRActions } from "./pages/QRActions/QRActions";

export const PrivateRoutes: React.FC = () => {
    const [isLoggedIn] = useAuth((state) => [state.isLoggedIn]);

    if (!isLoggedIn) {
        return <Redirect to={Routes.login} />;
    }

    return (
        <IonRouterOutlet>
            <Route exact path={Routes.home}>
                <Home />
            </Route>
            <Route exact path="/">
                <Redirect to={Routes.home} />
            </Route>
            <Route exact path={Routes.qr}>
                <QRActions />
            </Route>
        </IonRouterOutlet>
    );
};
