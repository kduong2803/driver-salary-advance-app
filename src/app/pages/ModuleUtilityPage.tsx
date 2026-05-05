import { ArrowLeft, CalendarDays, ClipboardList, Home, Settings, WalletCards } from "lucide-react";
import { Link } from "react-router";

type ModuleUtilityPageProps = {
  moduleName: string;
  modulePath: string;
  type: "manage" | "history" | "settings";
};

const config = {
  manage: {
    title: "Quản lý",
    icon: WalletCards,
    description: "Theo dõi các sản phẩm đang bật, trạng thái xử lý và số liệu vận hành chính.",
  },
  history: {
    title: "Lịch sử",
    icon: CalendarDays,
    description: "Xem lại các giao dịch, thay đổi trạng thái và hoạt động đã phát sinh trong module.",
  },
  settings: {
    title: "Cài đặt",
    icon: Settings,
    description: "Điều chỉnh cấu hình, thông báo và lựa chọn mặc định của module.",
  },
};

export function ModuleUtilityPage({ moduleName, modulePath, type }: ModuleUtilityPageProps) {
  const page = config[type];
  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <Link to={modulePath} className="mb-5 inline-flex items-center gap-2 text-sm text-white/80">
          <ArrowLeft className="h-4 w-4" />
          Về {moduleName}
        </Link>
        <Link to="/" className="mb-5 ml-4 inline-flex items-center gap-2 text-sm text-white/80">
          <Home className="h-4 w-4" />
          Về ví
        </Link>
        <p className="text-sm text-white/75">GSM Financial Services</p>
        <h1 className="mt-1 text-3xl">{page.title} {moduleName}</h1>
        <p className="mt-2 text-sm text-white/80">{page.description}</p>
      </div>

      <div className="mx-auto max-w-lg px-6 py-6">
        <div className="rounded-3xl border border-primary/20 bg-card p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <h2 className="text-xl">Khung {page.title.toLowerCase()} đã sẵn sàng</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Màn này đang được đặt đúng trong module {moduleName}. Khi mình và bạn build sâu từng danh mục,
            phần này sẽ được thay bằng dữ liệu và tương tác thật của module đó.
          </p>
          <div className="mt-5 rounded-2xl bg-primary/10 p-4 text-left">
            <div className="flex items-start gap-3">
              <ClipboardList className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm text-secondary-foreground">
                Navigation không còn dùng chung với sản phẩm ứng doanh thu nữa, nên người dùng chỉ thấy tab quản lý/lịch sử/cài đặt sau khi đã vào module.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
