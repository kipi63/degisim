// import { BrowserRouter as Router } from "react-router-dom";
// import { Routes } from "react-router-dom";
// import { Route } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ErrorPage } from "./Pages/ErrorPage";
import { Home } from "./Pages/Home";

import { Todos } from "./Pages/Todos";
import { SharedLayout } from "./Pages/SharedLayout";
import { AppRoutes } from "./Routes";
import { RenderedPage } from "./Pages/RenderedPage";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoutes.Home} element={<SharedLayout />}>
                    <Route index element={<Home />} />

                    <Route path={AppRoutes.Todos} element={<Todos />} />
                    <Route path="/rendered-page" component={RenderedPage} />

                    <Route path={AppRoutes.Error} element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
