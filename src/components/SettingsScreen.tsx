import { useState } from "react";
import Icon from "@/components/ui/icon";

const SettingsScreen = () => {
  const [protocol, setProtocol] = useState("wireguard");
  const [encryption, setEncryption] = useState("aes256");
  const [killSwitch, setKillSwitch] = useState(true);
  const [splitTunnel, setSplitTunnel] = useState(false);
  const [autoConnect, setAutoConnect] = useState(true);
  const [dnsLeak, setDnsLeak] = useState(true);
  const [obfuscation, setObfuscation] = useState(false);
  const [customDns, setCustomDns] = useState("1.1.1.1");

  const Toggle = ({
    value,
    onChange,
  }: {
    value: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <button
      onClick={() => onChange(!value)}
      className="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none"
      style={{ background: value ? "hsl(var(--neon))" : "hsl(var(--secondary))" }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow"
        style={{ transform: value ? "translateX(24px)" : "translateX(0)" }}
      />
    </button>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">{title}</p>
      <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border">{children}</div>
    </div>
  );

  const Row = ({
    icon,
    label,
    sub,
    right,
  }: {
    icon: string;
    label: string;
    sub?: string;
    right: React.ReactNode;
  }) => (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--neon)/0.1)" }}>
        <Icon name={icon as "Lock"} size={16} className="neon-text" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  );

  return (
    <div className="flex flex-col h-full px-5 pt-6 overflow-y-auto pb-4">
      <h2 className="text-xl font-bold text-foreground mb-5">Параметры</h2>

      <Section title="Протокол">
        {[
          { id: "wireguard", label: "WireGuard", sub: "Быстрый и современный" },
          { id: "openvpn", label: "OpenVPN", sub: "Надёжный и совместимый" },
          { id: "shadowsocks", label: "Shadowsocks", sub: "Обход блокировок" },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setProtocol(p.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all"
          >
            <div
              className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
              style={{
                borderColor: protocol === p.id ? "hsl(var(--neon))" : "hsl(var(--border))",
              }}
            >
              {protocol === p.id && (
                <div className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--neon))" }} />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{p.label}</p>
              <p className="text-xs text-muted-foreground">{p.sub}</p>
            </div>
          </button>
        ))}
      </Section>

      <Section title="Шифрование">
        {[
          { id: "aes256", label: "AES-256-GCM", sub: "Максимальная защита" },
          { id: "chacha20", label: "ChaCha20-Poly1305", sub: "Быстрее на мобильных" },
        ].map((e) => (
          <button
            key={e.id}
            onClick={() => setEncryption(e.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
          >
            <div
              className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
              style={{
                borderColor: encryption === e.id ? "hsl(var(--neon))" : "hsl(var(--border))",
              }}
            >
              {encryption === e.id && (
                <div className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--neon))" }} />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{e.label}</p>
              <p className="text-xs text-muted-foreground">{e.sub}</p>
            </div>
          </button>
        ))}
      </Section>

      <Section title="Безопасность">
        <Row icon="Power" label="Kill Switch" sub="Блокировать трафик при разрыве" right={<Toggle value={killSwitch} onChange={setKillSwitch} />} />
        <Row icon="Eye" label="DNS Leak Protection" sub="Скрыть DNS-запросы" right={<Toggle value={dnsLeak} onChange={setDnsLeak} />} />
        <Row icon="EyeOff" label="Обфускация" sub="Маскировка VPN трафика" right={<Toggle value={obfuscation} onChange={setObfuscation} />} />
      </Section>

      <Section title="Подключение">
        <Row icon="Wifi" label="Split Tunneling" sub="Выбор приложений для VPN" right={<Toggle value={splitTunnel} onChange={setSplitTunnel} />} />
        <Row icon="Zap" label="Автоподключение" sub="При запуске приложения" right={<Toggle value={autoConnect} onChange={setAutoConnect} />} />
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--neon)/0.1)" }}>
            <Icon name="Globe" size={16} className="neon-text" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">DNS-сервер</p>
          </div>
          <input
            type="text"
            value={customDns}
            onChange={(e) => setCustomDns(e.target.value)}
            className="w-28 bg-secondary border border-border rounded-xl px-3 py-1.5 text-sm text-foreground text-right focus:outline-none focus:border-[hsl(var(--neon)/0.5)]"
          />
        </div>
      </Section>
    </div>
  );
};

export default SettingsScreen;
