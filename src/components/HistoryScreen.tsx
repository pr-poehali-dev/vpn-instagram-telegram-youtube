import Icon from "@/components/ui/icon";

const LOGS = [
  { id: 1, server: "Амстердам, 🇳🇱", date: "24 мар, 14:32", duration: "1ч 12м", down: "1.2 GB", up: "120 MB", status: "success" },
  { id: 2, server: "Франкфурт, 🇩🇪", date: "24 мар, 10:05", duration: "45м", down: "540 MB", up: "48 MB", status: "success" },
  { id: 3, server: "Лондон, 🇬🇧", date: "23 мар, 22:18", duration: "2ч 03м", down: "2.4 GB", up: "210 MB", status: "success" },
  { id: 4, server: "Токио, 🇯🇵", date: "23 мар, 18:40", duration: "8м", down: "88 MB", up: "12 MB", status: "error" },
  { id: 5, server: "Амстердам, 🇳🇱", date: "22 мар, 20:00", duration: "3ч 47м", down: "3.1 GB", up: "340 MB", status: "success" },
  { id: 6, server: "Нью-Йорк, 🇺🇸", date: "21 мар, 15:30", duration: "1ч 55м", down: "1.8 GB", up: "160 MB", status: "success" },
];

const STATS = [
  { label: "Всего сессий", value: "47", icon: "Activity" },
  { label: "Скачано", value: "38.2 GB", icon: "ArrowDown" },
  { label: "Загружено", value: "4.1 GB", icon: "ArrowUp" },
  { label: "Среднее время", value: "1ч 28м", icon: "Clock" },
];

const HistoryScreen = () => {
  return (
    <div className="flex flex-col h-full px-5 pt-6 overflow-y-auto pb-4">
      <h2 className="text-xl font-bold text-foreground mb-4">История</h2>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {STATS.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon name={s.icon as "Activity"} size={14} className="neon-text" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-lg font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">Последние подключения</p>

      <div className="space-y-2">
        {LOGS.map((log) => (
          <div key={log.id} className="glass-card rounded-2xl p-4 flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background:
                  log.status === "success"
                    ? "hsl(var(--neon)/0.1)"
                    : "hsl(0 72% 51%/0.1)",
              }}
            >
              <Icon
                name={log.status === "success" ? "ShieldCheck" : "ShieldX"}
                size={18}
                style={{
                  color:
                    log.status === "success"
                      ? "hsl(var(--neon))"
                      : "hsl(0 72% 51%)",
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{log.server}</p>
              <p className="text-xs text-muted-foreground">{log.date} · {log.duration}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <Icon name="ArrowDown" size={10} className="neon-text" />
                <span className="text-xs text-foreground">{log.down}</span>
              </div>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <Icon name="ArrowUp" size={10} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{log.up}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-3 rounded-xl text-sm text-muted-foreground border border-border hover:border-[hsl(var(--neon)/0.3)] hover:text-foreground transition-all">
        Очистить историю
      </button>
    </div>
  );
};

export default HistoryScreen;
