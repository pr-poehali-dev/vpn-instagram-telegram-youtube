import { useState } from "react";
import Icon from "@/components/ui/icon";
import HomeScreen from "@/components/HomeScreen";
import ServersScreen from "@/components/ServersScreen";
import SettingsScreen from "@/components/SettingsScreen";
import HistoryScreen from "@/components/HistoryScreen";
import ProfileScreen from "@/components/ProfileScreen";

type Tab = "home" | "servers" | "settings" | "history" | "profile";

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "servers", icon: "Server", label: "Серверы" },
  { id: "settings", icon: "SlidersHorizontal", label: "Параметры" },
  { id: "history", icon: "Clock", label: "История" },
  { id: "profile", icon: "User", label: "Профиль" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{ background: "hsl(220 25% 4%)" }}
    >
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "min(420px, 100vw)",
          height: "min(820px, 100dvh)",
          background: "hsl(var(--background))",
          borderRadius: "min(2rem, 0px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex-1 overflow-hidden relative">
          <div className={activeTab === "home" ? "h-full" : "hidden"}>
            <HomeScreen onNavigate={(tab) => setActiveTab(tab as Tab)} />
          </div>
          <div className={activeTab === "servers" ? "h-full" : "hidden"}>
            <ServersScreen />
          </div>
          <div className={activeTab === "settings" ? "h-full" : "hidden"}>
            <SettingsScreen />
          </div>
          <div className={activeTab === "history" ? "h-full" : "hidden"}>
            <HistoryScreen />
          </div>
          <div className={activeTab === "profile" ? "h-full" : "hidden"}>
            <ProfileScreen onAbout={() => {}} />
          </div>
        </div>

        <nav
          className="shrink-0 grid grid-cols-5 border-t"
          style={{
            borderColor: "hsl(var(--border))",
            background: "hsl(var(--background)/0.95)",
            backdropFilter: "blur(12px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center justify-center py-3 gap-0.5 transition-all focus:outline-none relative"
              >
                {isActive && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                    style={{ background: "hsl(var(--neon))" }}
                  />
                )}
                <Icon
                  name={tab.icon as "Home"}
                  size={20}
                  style={{ color: isActive ? "hsl(var(--neon))" : "hsl(var(--muted-foreground))" }}
                />
                <span
                  className="text-[10px] font-medium"
                  style={{ color: isActive ? "hsl(var(--neon))" : "hsl(var(--muted-foreground))" }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Index;
