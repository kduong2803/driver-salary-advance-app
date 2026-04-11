import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Manage } from "./pages/Manage";
import { History } from "./pages/History";
import { EWADiscovery } from "./pages/ewa/EWADiscovery";
import { EWARegister } from "./pages/ewa/EWARegister";
import { EWARequest } from "./pages/ewa/EWARequest";
import { EWASuccess } from "./pages/ewa/EWASuccess";
import { EWADetail } from "./pages/ewa/EWADetail";
import { RBFDiscovery } from "./pages/rbf/RBFDiscovery";
import { RBFRegister } from "./pages/rbf/RBFRegister";
import { RBFRequest } from "./pages/rbf/RBFRequest";
import { RBFSuccess } from "./pages/rbf/RBFSuccess";
import { RBFDetail } from "./pages/rbf/RBFDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "manage", Component: Manage },
      { path: "history", Component: History },
      { path: "ewa/discovery", Component: EWADiscovery },
      { path: "ewa/register", Component: EWARegister },
      { path: "ewa/request", Component: EWARequest },
      { path: "ewa/success", Component: EWASuccess },
      { path: "ewa/detail/:id", Component: EWADetail },
      { path: "rbf/discovery", Component: RBFDiscovery },
      { path: "rbf/register", Component: RBFRegister },
      { path: "rbf/request", Component: RBFRequest },
      { path: "rbf/success", Component: RBFSuccess },
      { path: "rbf/detail/:id", Component: RBFDetail },
    ],
  },
]);
