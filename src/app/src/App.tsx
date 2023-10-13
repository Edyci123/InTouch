import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";
import "./theme/global.scss";

/* Pages */
import { Menu } from "./pages/Layout/Menu";
import { Home } from "./pages/Home/Home";
import Routes from "./Routes";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuth } from "./services/storage/auth.store";
import { useEffect } from "react";
import { useGlobal } from "./services/storage/global.store";
import { api } from "./services/api/API";

setupIonicReact();

const App: React.FC = () => {
    const [token, isLoggedIn] = useAuth((state) => [
        state.token,
        state.isLoggedIn,
    ]);
    const [setUser] = useGlobal((state) => [state.setUser]);

    useEffect(() => {
        if (isLoggedIn && token) {
            api.setToken(token);
            api.auth.me().then((response) => setUser(response));
        }
    }, [isLoggedIn]);

    return (
        <IonApp>
            <IonReactRouter>
                <Menu />
                <IonRouterOutlet id="menu-content">
                    <PrivateRoutes />
                    <Route exact path={Routes.login}>
                        <Login />
                    </Route>
                    <Route exact path={Routes.register}>
                        <Register />
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
