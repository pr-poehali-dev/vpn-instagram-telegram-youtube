import { useState } from "react";
import Icon from "@/components/ui/icon";

const ProfileScreen = ({ onAbout }: { onAbout: () => void }) => {
  const [tab, setTab] = useState<"profile" | "about">("profile");

  const plan = {
    name: "Premium",
    expires: "12 апр 2026",
    devices: 3,
    maxDevices: 5,
  };

  return (
    <div className="flex flex-col h-full px-5 pt-6 overflow-y-auto pb-4">
      <div className="flex gap-1 mb-5 p-1 glass-card rounded-2xl">
        {(["profile", "about"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
            style={
              tab === t
                ? { background: "hsl(var(--neon)/0.15)", color: "hsl(var(--neon))" }
                : { color: "hsl(var(--muted-foreground))" }
            }
          >
            {t === "profile" ? "Профиль" : "О приложении"}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="animate-fade-up">
          <div className="glass-card rounded-2xl p-5 flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ background: "hsl(var(--neon)/0.15)", color: "hsl(var(--neon))" }}
            >
              N
            </div>
            <div>
              <p className="text-base font-bold text-foreground">Nurik User</p>
              <p className="text-sm text-muted-foreground">nurik@example.com</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md"
                  style={{ background: "hsl(45 95% 55%/0.15)", color: "hsl(45 95% 55%)" }}
                >
                  ★ {plan.name}
                </span>
                <span className="text-xs text-muted-foreground">до {plan.expires}</span>
              </div>
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">Подписка</p>
          <div className="glass-card rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Premium план</p>
                <p className="text-xs text-muted-foreground">Неограниченный трафик</p>
              </div>
              <button
                className="text-xs font-semibold px-3 py-1.5 rounded-xl"
                style={{ background: "hsl(var(--neon)/0.15)", color: "hsl(var(--neon))" }}
              >
                Продлить
              </button>
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Устройства</span>
                <span>{plan.devices}/{plan.maxDevices}</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(plan.devices / plan.maxDevices) * 100}%`,
                    background: "hsl(var(--neon))",
                  }}
                />
              </div>
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">Функции</p>
          <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border mb-4">
            {[
              { icon: "Server", label: "10 серверов Premium", ok: true },
              { icon: "Zap", label: "WireGuard протокол", ok: true },
              { icon: "Shield", label: "Kill Switch", ok: true },
              { icon: "Globe", label: "Split Tunneling", ok: true },
              { icon: "Users", label: "До 5 устройств", ok: true },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 px-4 py-3">
                <Icon name={f.icon as "Server"} size={16} className="neon-text" />
                <p className="flex-1 text-sm text-foreground">{f.label}</p>
                <Icon name="CheckCircle2" size={16} className="neon-text" />
              </div>
            ))}
          </div>

          <button className="w-full py-3 rounded-xl text-sm text-destructive border border-destructive/20 hover:bg-destructive/10 transition-all">
            Выйти из аккаунта
          </button>
        </div>
      )}

      {tab === "about" && (
        <div className="animate-fade-up">
          <div className="glass-card rounded-2xl p-5 flex flex-col items-center mb-4">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-3"
              style={{
                background: "linear-gradient(135deg, hsl(var(--neon)/0.2), hsl(var(--neon)/0.05))",
                border: "1.5px solid hsl(var(--neon)/0.3)",
              }}
            >
              <Icon name="Shield" size={40} className="neon-text" />
            </div>
            <h3 className="text-xl font-bold text-foreground">NURIK VPN</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Версия 1.0.0</p>
            <p className="text-xs text-muted-foreground mt-1">WireGuard · AES-256 · No-logs</p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border mb-4">
            {[
              { icon: "FileText", label: "Политика конфиденциальности" },
              { icon: "FileCheck", label: "Условия использования" },
              { icon: "HelpCircle", label: "Поддержка" },
              { icon: "Star", label: "Оценить приложение" },
              { icon: "Share2", label: "Поделиться с друзьями" },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-all"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--neon)/0.1)" }}>
                  <Icon name={item.icon as "Star"} size={16} className="neon-text" />
                </div>
                <p className="flex-1 text-sm font-medium text-foreground">{item.label}</p>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-xs text-muted-foreground">© 2026 NURIK VPN. Все права защищены.</p>
            <p className="text-xs text-muted-foreground mt-1">Сделано с ❤️ для вашей приватности</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
