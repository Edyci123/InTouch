import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Routes from "./Routes";
import { Friends } from "./pages/Friends/Friends";
import { Home } from "./pages/Home/Home";
import { QRActions } from "./pages/QRActions/QRActions";
import { Settings } from "./pages/Settings/Settings";
import { useAuth } from "./services/storage/auth.store";

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
            <Route exact path={Routes.friends}>
                <Friends />
            </Route>
            <Route exact path={Routes.settings}>
                <Settings />
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
