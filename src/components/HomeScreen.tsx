import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

type ConnectionStatus = "disconnected" | "connecting" | "connected";

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [connectedTime, setConnectedTime] = useState(0);
  const [selectedServer, setSelectedServer] = useState({ country: "Нидерланды", flag: "🇳🇱", city: "Амстердам", ping: 24 });
  const [dataUsed, setDataUsed] = useState({ down: 0, up: 0 });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === "connected") {
      interval = setInterval(() => {
        setConnectedTime((t) => t + 1);
        setDataUsed((d) => ({
          down: d.down + Math.random() * 0.05,
          up: d.up + Math.random() * 0.01,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const formatMB = (mb: number) =>
    mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;

  const handleConnect = () => {
    if (status === "disconnected") {
      setStatus("connecting");
      setTimeout(() => {
        setStatus("connected");
        setConnectedTime(0);
        setDataUsed({ down: 0, up: 0 });
      }, 2200);
    } else if (status === "connected") {
      setStatus("disconnected");
      setConnectedTime(0);
      setDataUsed({ down: 0, up: 0 });
    }
  };

  const statusColor = {
    disconnected: "hsl(0 72% 51%)",
    connecting: "hsl(45 95% 55%)",
    connected: "hsl(var(--neon))",
  }[status];

  const statusLabel = {
    disconnected: "Не подключено",
    connecting: "Подключение...",
    connected: "Защищено",
  }[status];

  return (
    <div className="flex flex-col items-center px-5 pt-8 pb-4 min-h-full">
      <div className="w-full flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">NURIK</h1>
          <p className="text-xs text-muted-foreground mt-0.5">WireGuard VPN</p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card cursor-pointer"
          onClick={() => onNavigate("servers")}
        >
          <span className="text-base">{selectedServer.flag}</span>
          <span className="text-sm text-foreground">{selectedServer.city}</span>
          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full gap-8">
        <div className="relative flex items-center justify-center">
          {status === "connected" && (
            <>
              <div
                className="absolute rounded-full animate-pulse-ring"
                style={{
                  width: 200,
                  height: 200,
                  background: `hsl(var(--neon) / 0.08)`,
                  border: `1px solid hsl(var(--neon) / 0.2)`,
                }}
              />
              <div
                className="absolute rounded-full animate-pulse-ring2"
                style={{
                  width: 240,
                  height: 240,
                  background: `hsl(var(--neon) / 0.04)`,
                  border: `1px solid hsl(var(--neon) / 0.1)`,
                }}
              />
            </>
          )}
          <button
            onClick={handleConnect}
            disabled={status === "connecting"}
            className="relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-300 focus:outline-none"
            style={{
              background: `radial-gradient(circle at 40% 35%, hsl(var(--card)), hsl(var(--background)))`,
              border: `2.5px solid ${statusColor}`,
              boxShadow: `0 0 40px ${statusColor}33, 0 0 80px ${statusColor}11`,
            }}
          >
            {status === "connecting" ? (
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 dot-1" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 dot-2" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 dot-3" />
              </div>
            ) : (
              <Icon
                name={status === "connected" ? "ShieldCheck" : "ShieldOff"}
                size={48}
                style={{ color: statusColor }}
              />
            )}
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: statusColor }}>
              {status === "connected" ? "Отключить" : status === "connecting" ? "Ждите" : "Подключить"}
            </span>
          </button>
        </div>

        <div className="text-center animate-fade-up">
          <p className="text-sm font-medium" style={{ color: statusColor }}>
            {statusLabel}
          </p>
          {status === "connected" && (
            <p className="text-2xl font-mono font-bold text-foreground mt-1">{formatTime(connectedTime)}</p>
          )}
        </div>

        {status === "connected" && (
          <div className="w-full grid grid-cols-2 gap-3 animate-fade-up">
            <div className="glass-card rounded-2xl p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Icon name="ArrowDown" size={14} className="neon-text" />
                <span className="text-xs">Загрузка</span>
              </div>
              <p className="text-base font-bold text-foreground">{formatMB(dataUsed.down)}</p>
            </div>
            <div className="glass-card rounded-2xl p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Icon name="ArrowUp" size={14} className="neon-text" />
                <span className="text-xs">Отдача</span>
              </div>
              <p className="text-base font-bold text-foreground">{formatMB(dataUsed.up)}</p>
            </div>
            <div className="glass-card rounded-2xl p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Icon name="Gauge" size={14} className="neon-text" />
                <span className="text-xs">Пинг</span>
              </div>
              <p className="text-base font-bold text-foreground">{selectedServer.ping} мс</p>
            </div>
            <div className="glass-card rounded-2xl p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Icon name="Zap" size={14} className="neon-text" />
                <span className="text-xs">Протокол</span>
              </div>
              <p className="text-base font-bold text-foreground">WireGuard</p>
            </div>
          </div>
        )}

        {status === "disconnected" && (
          <div className="w-full glass-card rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--neon)/0.1)" }}>
              <Icon name="Server" size={18} className="neon-text" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{selectedServer.country}</p>
              <p className="text-xs text-muted-foreground">{selectedServer.city} · {selectedServer.ping} мс</p>
            </div>
            <button
              onClick={() => onNavigate("servers")}
              className="text-xs neon-text font-semibold px-3 py-1.5 rounded-xl"
              style={{ background: "hsl(var(--neon)/0.1)" }}
            >
              Сменить
            </button>
          </div>
        )}
      </div>

      <div className="w-full mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Icon name="Lock" size={12} />
          <span>AES-256-GCM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon name="Wifi" size={12} />
          <span>Split Tunneling</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon name="Eye" size={12} />
          <span>Kill Switch</span>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
