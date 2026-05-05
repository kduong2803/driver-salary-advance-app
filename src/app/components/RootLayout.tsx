import { Link, Outlet, useLocation } from "react-router";
import { Clock3, History, Home, Settings, User, Wallet } from "lucide-react";

type NavItem = {
  icon: typeof Home;
  label: string;
  path: string;
};

const walletNav: NavItem[] = [
  { icon: Home, label: "Trang chủ", path: "/" },
  { icon: History, label: "Lịch sử", path: "/wallet/history" },
  { icon: User, label: "Tài khoản", path: "/wallet/account" },
];

const moduleNavs: Record<string, NavItem[]> = {
  credit: [
    { icon: Home, label: "Sản phẩm", path: "/credit" },
    { icon: Wallet, label: "Quản lý", path: "/credit/manage" },
    { icon: History, label: "Lịch sử", path: "/credit/history" },
    { icon: Settings, label: "Cài đặt", path: "/credit/settings" },
  ],
  insurance: [
    { icon: Home, label: "Sản phẩm", path: "/insurance" },
    { icon: Wallet, label: "Quản lý", path: "/insurance/manage" },
    { icon: History, label: "Lịch sử", path: "/insurance/history" },
    { icon: Settings, label: "Cài đặt", path: "/insurance/settings" },
  ],
  investment: [
    { icon: Home, label: "Sản phẩm", path: "/investment" },
    { icon: Wallet, label: "Quản lý", path: "/investment/manage" },
    { icon: History, label: "Lịch sử", path: "/investment/history" },
    { icon: Settings, label: "Cài đặt", path: "/investment/settings" },
  ],
  yield: [
    { icon: Home, label: "Sản phẩm", path: "/yield/detail" },
    { icon: Clock3, label: "Lịch sử", path: "/yield/history" },
    { icon: Settings, label: "Cài đặt", path: "/yield/settings" },
  ],
};

const getActiveModule = (pathname: string) => {
  if (pathname === "/credit" || pathname.startsWith("/credit/")) return "credit";
  if (pathname.startsWith("/ewa/") || pathname.startsWith("/rbf/") || pathname.startsWith("/loan/")) return "credit";
  if (pathname === "/insurance" || pathname.startsWith("/insurance/")) return "insurance";
  if (pathname === "/investment" || pathname.startsWith("/investment/")) return "investment";
  if (pathname === "/yield" || pathname.startsWith("/yield/")) return "yield";
  return null;
};

const isNavItemActive = (pathname: string, item: NavItem, activeModule: string | null) => {
  if (activeModule === "credit" && item.path === "/credit") {
    return pathname === "/credit" || pathname.startsWith("/ewa/") || pathname.startsWith("/rbf/") || pathname.startsWith("/loan/");
  }

  if (!activeModule && item.path === "/") {
    return pathname === "/" || pathname === "/green-points";
  }

  return pathname === item.path;
};

export function RootLayout() {
  const location = useLocation();
  const activeModule = getActiveModule(location.pathname);
  const navItems = activeModule ? moduleNavs[activeModule] : walletNav;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,188,212,0.18),_transparent_38%),linear-gradient(180deg,_#f4fbff_0%,_#eaf6ff_100%)] md:px-6 md:py-5">
      <div className="relative mx-auto flex min-h-screen max-w-[430px] flex-col bg-background md:min-h-[min(920px,calc(100vh-2.5rem))] md:overflow-hidden md:rounded-[38px] md:border md:border-white/70 md:shadow-[0_28px_90px_rgba(12,74,110,0.22)]">
        <div className="pointer-events-none absolute left-1/2 top-3 z-30 hidden h-7 w-36 -translate-x-1/2 rounded-full bg-slate-950/90 shadow-[0_8px_24px_rgba(15,23,42,0.35)] md:block" />

        <main className="flex-1 overflow-x-hidden pb-24">
          <Outlet />
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/30 bg-card/95 backdrop-blur-md safe-area-inset-bottom md:absolute md:bottom-0 md:left-0 md:right-0">
          <div className="mx-auto max-w-lg px-2 py-2">
            <div className="flex items-center justify-around">
              {navItems.map((item) => {
                const active = isNavItemActive(location.pathname, item, activeModule);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex min-w-20 flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all active:scale-95 ${
                      active ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-xs">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
