import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Manage } from "./pages/Manage";
import { History } from "./pages/History";
import { Credit } from "./pages/Credit";
import { GreenPoints } from "./pages/GreenPoints";
import { Insurance } from "./pages/Insurance";
import { InsuranceManage } from "./pages/InsuranceManage";
import { InsuranceHistory } from "./pages/InsuranceHistory";
import { Investment } from "./pages/Investment";
import { YieldHome } from "./pages/yield/YieldHome";
import { YieldDiscovery } from "./pages/yield/YieldDiscovery";
import { YieldRegister } from "./pages/yield/YieldRegister";
import { YieldDetail } from "./pages/yield/YieldDetail";
import { YieldDeposit } from "./pages/yield/YieldDeposit";
import { YieldWithdraw } from "./pages/yield/YieldWithdraw";
import { ModuleUtilityPage } from "./pages/ModuleUtilityPage";
import { WalletAccount } from "./pages/WalletAccount";
import { WalletHistory } from "./pages/WalletHistory";
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
import { LoanDiscovery } from "./pages/loan/LoanDiscovery";
import { LoanRequest } from "./pages/loan/LoanRequest";
import { LoanSuccess } from "./pages/loan/LoanSuccess";
import { LoanDetail } from "./pages/loan/LoanDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "wallet/history", Component: WalletHistory },
      { path: "wallet/account", Component: WalletAccount },
      { path: "insurance", Component: Insurance },
      { path: "insurance/manage", Component: InsuranceManage },
      { path: "insurance/history", Component: InsuranceHistory },
      { path: "insurance/settings", element: <ModuleUtilityPage moduleName="Bảo hiểm" modulePath="/insurance" type="settings" /> },
      { path: "credit", Component: Credit },
      { path: "credit/manage", Component: Manage },
      { path: "credit/history", Component: History },
      { path: "credit/settings", element: <ModuleUtilityPage moduleName="Tín dụng" modulePath="/credit" type="settings" /> },
      { path: "yield", Component: YieldHome },
      { path: "yield/discovery", Component: YieldDiscovery },
      { path: "yield/register", Component: YieldRegister },
      { path: "yield/detail", Component: YieldDetail },
      { path: "yield/history", Component: YieldDetail },
      { path: "yield/settings", Component: YieldDetail },
      { path: "yield/deposit", Component: YieldDeposit },
      { path: "yield/withdraw", Component: YieldWithdraw },
      { path: "investment", Component: Investment },
      { path: "investment/manage", element: <ModuleUtilityPage moduleName="Đầu tư CCQ" modulePath="/investment" type="manage" /> },
      { path: "investment/history", element: <ModuleUtilityPage moduleName="Đầu tư CCQ" modulePath="/investment" type="history" /> },
      { path: "investment/settings", element: <ModuleUtilityPage moduleName="Đầu tư CCQ" modulePath="/investment" type="settings" /> },
      { path: "green-points", Component: GreenPoints },
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
      { path: "loan/discovery", Component: LoanDiscovery },
      { path: "loan/request", Component: LoanRequest },
      { path: "loan/success", Component: LoanSuccess },
      { path: "loan/detail/:id", Component: LoanDetail },
    ],
  },
]);
