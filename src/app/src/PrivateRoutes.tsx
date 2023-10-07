import React from "react";
import { useAuth } from "./services/storage/auth.store";
import { Redirect, Route, Router } from "react-router";
import { APIRoutes } from "./services/api/APIRoutes";
import { IonRouterOutlet } from "@ionic/react";
import Routes from "./Routes";
import { Home } from "./pages/Home/Home";
import { Friends } from "./pages/Friends/Friends";
import { Settings } from "./pages/Settings/Settings";

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
        </IonRouterOutlet>
    );
};
