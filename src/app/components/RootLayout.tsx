import { Outlet, useLocation, Link } from "react-router";
import { Home, Wallet, History, User } from "lucide-react";

export function RootLayout() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Trang chủ", path: "/" },
    { icon: Wallet, label: "Quản lý", path: "/manage" },
    { icon: History, label: "Lịch sử", path: "/history" },
    { icon: User, label: "Tài khoản", path: "/" },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,188,212,0.18),_transparent_38%),linear-gradient(180deg,_#f4fbff_0%,_#eaf6ff_100%)] md:px-6 md:py-5">
      <div className="relative mx-auto flex min-h-screen max-w-[430px] flex-col bg-background md:min-h-[min(920px,calc(100vh-2.5rem))] md:overflow-hidden md:rounded-[38px] md:border md:border-white/70 md:shadow-[0_28px_90px_rgba(12,74,110,0.22)]">
        <div className="pointer-events-none absolute left-1/2 top-3 z-30 hidden h-7 w-36 -translate-x-1/2 rounded-full bg-slate-950/90 shadow-[0_8px_24px_rgba(15,23,42,0.35)] md:block" />

        <main className="flex-1 overflow-x-hidden pb-24">
          <Outlet />
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/30 bg-card/95 backdrop-blur-md safe-area-inset-bottom md:absolute md:left-0 md:right-0 md:bottom-0">
          <div className="max-w-lg mx-auto px-2 py-2">
            <div className="flex justify-around items-center">
              {navItems.map((item) => {
                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all active:scale-95 ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
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
