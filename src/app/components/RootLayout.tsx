import { Outlet, useLocation, Link } from "react-router";
import { Home, Wallet, History, User } from "lucide-react";

export function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { icon: Home, label: "Trang chủ", path: "/" },
    { icon: Wallet, label: "Quản lý", path: "/manage" },
    { icon: History, label: "Lịch sử", path: "/history" },
    { icon: User, label: "Tài khoản", path: "/" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/30 safe-area-inset-bottom">
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
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "text-primary"
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
  );
}
