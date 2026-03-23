import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERVERS = [
  { id: 1, country: "Нидерланды", flag: "🇳🇱", city: "Амстердам", ping: 24, load: 38, premium: false },
  { id: 2, country: "Германия", flag: "🇩🇪", city: "Франкфурт", ping: 31, load: 55, premium: false },
  { id: 3, country: "США", flag: "🇺🇸", city: "Нью-Йорк", ping: 98, load: 62, premium: false },
  { id: 4, country: "Финляндия", flag: "🇫🇮", city: "Хельсинки", ping: 19, load: 21, premium: false },
  { id: 5, country: "Швейцария", flag: "🇨🇭", city: "Цюрих", ping: 37, load: 29, premium: true },
  { id: 6, country: "Япония", flag: "🇯🇵", city: "Токио", ping: 142, load: 44, premium: true },
  { id: 7, country: "Великобритания", flag: "🇬🇧", city: "Лондон", ping: 52, load: 67, premium: false },
  { id: 8, country: "Франция", flag: "🇫🇷", city: "Париж", ping: 41, load: 48, premium: false },
  { id: 9, country: "Канада", flag: "🇨🇦", city: "Торонто", ping: 112, load: 33, premium: true },
  { id: 10, country: "Сингапур", flag: "🇸🇬", city: "Сингапур", ping: 187, load: 56, premium: true },
];

const getLoadColor = (load: number) => {
  if (load < 40) return "hsl(var(--neon))";
  if (load < 70) return "hsl(45 95% 55%)";
  return "hsl(0 72% 51%)";
};

const getPingLabel = (ping: number) => {
  if (ping < 40) return "Отличный";
  if (ping < 80) return "Хороший";
  if (ping < 150) return "Средний";
  return "Медленный";
};

interface ServersScreenProps {
  selectedId?: number;
  onSelect?: (server: typeof SERVERS[0]) => void;
}

const ServersScreen = ({ selectedId = 1, onSelect }: ServersScreenProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "fast" | "premium">("all");
  const [active, setActive] = useState(selectedId);

  const filtered = SERVERS.filter((s) => {
    const matchSearch =
      s.country.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "fast" && s.ping < 50) ||
      (filter === "premium" && s.premium);
    return matchSearch && matchFilter;
  });

  const handleSelect = (server: typeof SERVERS[0]) => {
    setActive(server.id);
    onSelect?.(server);
  };

  return (
    <div className="flex flex-col h-full px-5 pt-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Серверы</h2>

      <div className="relative mb-3">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск по стране или городу..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-secondary border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--neon)/0.5)]"
        />
      </div>

      <div className="flex gap-2 mb-4">
        {(["all", "fast", "premium"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={
              filter === f
                ? { background: "hsl(var(--neon)/0.15)", color: "hsl(var(--neon))", border: "1px solid hsl(var(--neon)/0.3)" }
                : { background: "hsl(var(--secondary))", color: "hsl(var(--muted-foreground))", border: "1px solid transparent" }
            }
          >
            {f === "all" ? "Все" : f === "fast" ? "Быстрые" : "Premium"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pb-4">
        {filtered.map((server) => (
          <button
            key={server.id}
            onClick={() => handleSelect(server)}
            className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 text-left"
            style={
              active === server.id
                ? { borderColor: "hsl(var(--neon)/0.5)", boxShadow: "0 0 16px hsl(var(--neon)/0.1)" }
                : {}
            }
          >
            <span className="text-2xl">{server.flag}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold text-foreground">{server.country}</p>
                {server.premium && (
                  <span className="text-xs px-1.5 py-0.5 rounded-md font-bold" style={{ background: "hsl(45 95% 55%/0.15)", color: "hsl(45 95% 55%)" }}>
                    PRO
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{server.city}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${server.load}%`, background: getLoadColor(server.load) }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{server.load}%</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: getLoadColor(server.ping < 50 ? 20 : server.ping < 100 ? 55 : 75) }}>
                {server.ping} мс
              </p>
              <p className="text-xs text-muted-foreground">{getPingLabel(server.ping)}</p>
            </div>
            {active === server.id && (
              <Icon name="CheckCircle2" size={18} className="neon-text ml-1 shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServersScreen;
