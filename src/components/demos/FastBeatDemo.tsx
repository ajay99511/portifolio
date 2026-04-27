/* eslint-disable react-hooks/static-components */
"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Music,
  BarChart3,
  Image,
  Search,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  ChevronLeft,
  MoreVertical,
  ListMusic,
  Flame,
  Calendar,
  TrendingUp,
  Clock,
  Star,
  FolderOpen,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

/* ─── Exact colors from Color.kt ─── */
const C = {
  bg: "#141418",
  surfaceContainer: "#1C1C22",
  surfaceHigh: "#242430",
  surfaceHighest: "#2C2C38",
  surfaceBright: "#38384A",
  outline: "#44445A",
  outlineVariant: "#33334A",
  textPrimary: "#F0F0F5",
  textSecondary: "#B0B0C0",
  textTertiary: "#707088",
  accent: "#FF5500",
  accentDim: "rgba(255,85,0,0.15)",
  purple: "#8B51E6",
  pink: "#E44CD8",
  cyan: "#42E8E0",
  green: "#22C55E",
  blue: "#00E5FF",
  gold: "#FFD700",
};

type MainTab = 0 | 1 | 2 | 3; // Videos, Music, Images, Stats
type MusicSubTab = 0 | 1 | 2; // Tracks, Albums, Playlists
type VideoSubTab = 0 | 1 | 2; // Folders, Movies, Playlists

const mockTracks = [
  { id: 1, title: "Neon Nights", artist: "Synthwave Dreams", duration: "3:45", plays: 30 },
  { id: 2, title: "Midnight Drive", artist: "Retro Audio", duration: "4:20", plays: 25 },
  { id: 3, title: "Digital Sunset", artist: "Vapor Trails", duration: "5:12", plays: 18 },
  { id: 4, title: "Cyber City", artist: "Neon Glow", duration: "2:58", plays: 12 },
  { id: 5, title: "Starlight Run", artist: "Synthwave Dreams", duration: "3:33", plays: 8 },
];

const mockAlbums = [
  { id: 1, name: "Future Beats", artist: "Synthwave Dreams", count: 12 },
  { id: 2, name: "Night Cruise", artist: "Retro Audio", count: 8 },
  { id: 3, name: "Pixel Dreams", artist: "Neon Glow", count: 15 },
];

const mockFolders = [
  { id: "1", name: "Movies", count: 12 },
  { id: "2", name: "TV Shows", count: 24 },
  { id: "3", name: "Tutorials", count: 8 },
  { id: "4", name: "Downloads", count: 5 },
];

export default function FastBeatDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "fastbeat-media-player");
  const [mainTab, setMainTab] = useState<MainTab>(1);
  const [musicSub, setMusicSub] = useState<MusicSubTab>(0);
  const [videoSub, setVideoSub] = useState<VideoSubTab>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(mockTracks[0]);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [progress, setProgress] = useState(0.33);

  useEffect(() => {
    if (!isPlaying) return;
    const iv = setInterval(() => setProgress((p) => (p >= 1 ? 0 : p + 0.005)), 100);
    return () => clearInterval(iv);
  }, [isPlaying]);

  const tabLabels = ["Videos", "Music", "Images", "Stats"] as const;
  const tabIcons = [Play, Music, Image, BarChart3];
  const sectionTitle = tabLabels[mainTab].toUpperCase();

  /* ─── FastBeatHeader ─── */
  const Header = () => (
    <div style={{ background: C.bg }} className="shrink-0">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center">
          <span className="text-lg font-extrabold" style={{ color: C.textPrimary, letterSpacing: "-0.5px" }}>Fast</span>
          <span className="text-lg font-extrabold" style={{ color: C.accent, letterSpacing: "-0.5px" }}>Beat</span>
          <div className="mx-3.5 w-px h-[18px]" style={{ background: `${C.textPrimary}26` }} />
          <span className="text-xs font-bold tracking-[2px]" style={{ color: `${C.textPrimary}80` }}>{sectionTitle}</span>
        </div>
        <button className="w-[42px] h-[42px] rounded-full flex items-center justify-center" style={{ background: C.surfaceHigh }}>
          <Search size={18} style={{ color: C.textSecondary }} />
        </button>
      </div>
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${C.accent}40, transparent)` }} />
    </div>
  );

  /* ─── Sub-Tab Row (TRACKS / ALBUMS / PLAYLISTS) ─── */
  const SubTabRow = ({ tabs, active, onChange }: { tabs: string[]; active: number; onChange: (i: number) => void }) => (
    <div className="flex border-b" style={{ borderColor: `${C.textPrimary}1a` }}>
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => onChange(i)}
          className="flex-1 py-3 text-xs font-bold tracking-[1px] relative transition-colors"
          style={{ color: active === i ? C.accent : C.textTertiary }}
        >
          {t}
          {active === i && (
            <div className="absolute bottom-0 left-6 right-6 h-[3px] rounded-t" style={{ background: C.accent }} />
          )}
        </button>
      ))}
    </div>
  );

  /* ─── MiniPlayer ─── */
  const MiniPlayer = () => (
    <div
      className="absolute bottom-[56px] left-0 right-0 cursor-pointer"
      style={{ background: C.surfaceContainer }}
      onClick={() => setShowNowPlaying(true)}
    >
      {/* Gradient progress */}
      <div className="h-[3px] w-full" style={{ background: `${C.textPrimary}14` }}>
        <div className="h-full" style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.pink})` }} />
      </div>
      <div className="flex items-center px-4 py-2.5 gap-3.5">
        <div className="w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: C.surfaceHigh }}>
          <Music size={20} style={{ color: C.textSecondary }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: C.textPrimary }}>{activeTrack.title}</p>
          <p className="text-xs truncate" style={{ color: C.textSecondary }}>{activeTrack.artist}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button className="w-10 h-10 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); }}><SkipBack size={24} style={{ color: C.textSecondary }} /></button>
          <button
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.pink})` }}
            onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
          >
            {isPlaying ? <div className="w-3 h-3 border-l-[3px] border-r-[3px] border-white" /> : <Play size={20} className="ml-0.5 text-white" fill="white" />}
          </button>
          <button className="w-10 h-10 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); }}><SkipForward size={24} style={{ color: C.textSecondary }} /></button>
        </div>
      </div>
    </div>
  );

  /* ─── Bottom Navigation Bar ─── */
  const BottomNav = () => (
    <div className="absolute bottom-0 left-0 right-0 shrink-0">
      <div className="h-px" style={{ background: `${C.outlineVariant}80` }} />
      <div className="flex" style={{ background: C.bg }}>
        {tabLabels.map((label, i) => {
          const Icon = tabIcons[i];
          const active = mainTab === i;
          return (
            <button
              key={label}
              onClick={() => { setMainTab(i as MainTab); setShowNowPlaying(false); }}
              className="flex-1 flex flex-col items-center py-2 gap-0.5"
            >
              <div className={cn("px-5 py-1 rounded-full transition-colors")} style={active ? { background: C.accentDim } : {}}>
                <Icon size={22} style={{ color: active ? C.accent : `${C.textPrimary}80` }} fill={active ? C.accent : "none"} />
              </div>
              <span className="text-[11px]" style={{ color: active ? C.accent : `${C.textPrimary}80`, fontWeight: active ? 700 : 400 }}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ─── Now Playing Screen ─── */
  const NowPlayingScreen = () => (
    <div className="absolute inset-0 z-20 flex flex-col" style={{ background: C.bg }}>
      {/* Top Bar */}
      <div className="flex items-center px-4 pt-4 pb-4">
        <button onClick={() => setShowNowPlaying(false)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.surfaceHigh }}>
          <ChevronLeft size={20} style={{ color: C.textPrimary }} />
        </button>
        <div className="flex-1 text-center">
          <p className="text-[10px] font-bold tracking-[1px]" style={{ color: C.accent }}>NOW PLAYING</p>
          <p className="text-xs" style={{ color: C.textSecondary }}>From &quot;{activeTrack.artist}&quot;</p>
        </div>
        <button className="w-10 h-10 flex items-center justify-center"><ListMusic size={20} style={{ color: C.textPrimary }} /></button>
        <button className="w-10 h-10 flex items-center justify-center"><MoreVertical size={20} style={{ color: C.textSecondary }} /></button>
      </div>
      {/* Album Art */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-[92%] max-w-[280px] aspect-square rounded-[28px] flex items-center justify-center shadow-2xl mb-6" style={{ background: C.surfaceHigh, boxShadow: `0 24px 48px ${C.accent}30` }}>
          <Music size={64} style={{ color: `${C.accent}40` }} />
        </div>
        {/* Track Info */}
        <div className="w-full flex items-center justify-between mb-5 px-2">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold truncate" style={{ color: C.textPrimary }}>{activeTrack.title}</h2>
            <p className="text-base truncate" style={{ color: C.textSecondary }}>{activeTrack.artist}</p>
          </div>
          <button onClick={() => setIsFavorite(!isFavorite)} className="p-2"><Heart size={24} style={{ color: isFavorite ? C.accent : C.textSecondary }} fill={isFavorite ? C.accent : "none"} /></button>
        </div>
        {/* Progress */}
        <div className="w-full mb-5 px-2">
          <div className="h-1 w-full rounded-full" style={{ background: C.surfaceHigh }}>
            <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.accent}, ${C.pink}, ${C.cyan})` }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs" style={{ color: C.textSecondary }}>1:15</span>
            <span className="text-xs" style={{ color: C.textSecondary }}>{activeTrack.duration}</span>
          </div>
        </div>
        {/* Controls */}
        <div className="flex items-center justify-between w-full px-2">
          <button className="p-2"><Shuffle size={20} style={{ color: C.textSecondary }} /></button>
          <button className="p-2"><SkipBack size={30} style={{ color: C.textPrimary }} /></button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-[76px] h-[76px] rounded-full flex items-center justify-center shadow-2xl"
            style={{ background: `linear-gradient(180deg, ${C.accent}, ${C.purple})`, boxShadow: `0 24px 48px ${C.accent}50` }}
          >
            {isPlaying ? <div className="w-5 h-5 border-l-4 border-r-4 border-white" /> : <Play size={36} className="ml-1 text-white" fill="white" />}
          </button>
          <button className="p-2"><SkipForward size={30} style={{ color: C.textPrimary }} /></button>
          <button className="p-2"><Repeat size={20} style={{ color: C.textSecondary }} /></button>
        </div>
      </div>
    </div>
  );

  /* ─── Videos Tab ─── */
  const VideosTab = () => (
    <div className="flex-1 flex flex-col overflow-hidden">
      <SubTabRow tabs={["FOLDERS", "MOVIES", "PLAYLISTS"]} active={videoSub} onChange={(i) => setVideoSub(i as VideoSubTab)} />
      <div className="flex-1 overflow-y-auto p-4">
        {videoSub === 0 && (
          <div className="grid grid-cols-2 gap-4">
            {mockFolders.map((f) => (
              <div key={f.id} className="cursor-pointer">
                <div className="w-full aspect-[1.4] rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: C.surfaceContainer }}>
                  <FolderOpen size={40} style={{ color: C.accent }} />
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-bold" style={{ background: "rgba(0,0,0,0.7)", color: "white" }}>{f.count} items</div>
                </div>
                <p className="mt-2 text-sm font-bold truncate" style={{ color: C.textPrimary }}>{f.name}</p>
                <p className="text-xs" style={{ color: `${C.accent}cc` }}>{f.count} videos</p>
              </div>
            ))}
          </div>
        )}
        {videoSub === 1 && <p className="text-center py-8 text-sm" style={{ color: C.textTertiary }}>No videos longer than 1h found</p>}
        {videoSub === 2 && <p className="text-center py-8 text-sm" style={{ color: C.textTertiary }}>No video playlists yet</p>}
      </div>
    </div>
  );

  /* ─── Music Tab ─── */
  const MusicTab = () => (
    <div className="flex-1 flex flex-col overflow-hidden">
      <SubTabRow tabs={["TRACKS", "ALBUMS", "PLAYLISTS"]} active={musicSub} onChange={(i) => setMusicSub(i as MusicSubTab)} />
      <div className="flex-1 overflow-y-auto pb-28">
        {musicSub === 0 && (
          <div>
            {mockTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => { setActiveTrack(track); setIsPlaying(true); }}
                className="flex items-center px-4 py-3 gap-3 cursor-pointer transition-colors"
                style={{ background: activeTrack.id === track.id ? `${C.accent}0d` : "transparent" }}
              >
                <div className="w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: C.surfaceHigh }}>
                  <Music size={18} style={{ color: activeTrack.id === track.id ? C.accent : C.textTertiary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: activeTrack.id === track.id ? C.accent : C.textPrimary }}>{track.title}</p>
                  <p className="text-xs truncate" style={{ color: C.textSecondary }}>{track.artist}</p>
                </div>
                <span className="text-xs font-mono shrink-0" style={{ color: C.textTertiary }}>{track.duration}</span>
                <button className="p-1 shrink-0"><MoreVertical size={16} style={{ color: C.textTertiary }} /></button>
              </div>
            ))}
          </div>
        )}
        {musicSub === 1 && (
          <div className="grid grid-cols-2 gap-4 p-4">
            {mockAlbums.map((a) => (
              <div key={a.id} className="cursor-pointer">
                <div className="w-full aspect-square rounded-2xl flex items-center justify-center" style={{ background: C.surfaceHigh }}>
                  <Music size={32} style={{ color: C.textTertiary }} />
                </div>
                <p className="mt-2 text-sm font-bold truncate" style={{ color: C.textPrimary }}>{a.name}</p>
                <p className="text-xs" style={{ color: C.textSecondary }}>{a.artist} · {a.count} songs</p>
              </div>
            ))}
          </div>
        )}
        {musicSub === 2 && <p className="text-center py-8 text-sm" style={{ color: C.textTertiary }}>No playlists yet. Create one!</p>}
      </div>
    </div>
  );

  /* ─── Images Tab ─── */
  const ImagesTab = () => (
    <div className="flex-1 overflow-y-auto p-3">
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-md" style={{ background: [C.surfaceContainer, C.surfaceHigh, C.surfaceHighest][i % 3] }} />
        ))}
      </div>
    </div>
  );

  /* ─── Stats/Me Tab ─── */
  const StatsTab = () => (
    <div className="flex-1 overflow-y-auto pb-28">
      {/* Theme Switcher */}
      <div className="flex justify-center gap-6 py-6">
        {[{ color: C.accent, active: true }, { color: C.blue, active: false }, { color: C.green, active: false }].map((t, i) => (
          <div key={i} className={cn("w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all")} style={{ background: `${t.color}26`, outline: t.active ? `2px solid ${t.color}` : "none", outlineOffset: "2px" }}>
            <Star size={18} style={{ color: t.color }} fill={t.active ? t.color : "none"} />
          </div>
        ))}
      </div>
      {/* Listening Activity */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} style={{ color: C.accent }} />
          <span className="text-sm font-bold" style={{ color: C.textPrimary }}>LISTENING ACTIVITY</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { icon: Calendar, iconColor: C.accent, label: "Today", value: "1h 24m", sub: "Active Listening" },
            { icon: Flame, iconColor: C.accent, label: "Streak", value: "5 Days", sub: "Consecutive" },
            { icon: Calendar, iconColor: C.green, label: "Last 7 Days", value: "12h 30m", sub: "Total Playtime" },
            { icon: TrendingUp, iconColor: C.blue, label: "Daily Avg", value: "1h 47m", sub: "Last 30 Days" },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl p-4" style={{ background: C.surfaceContainer }}>
              <div className="flex items-center gap-2 mb-2">
                <card.icon size={16} style={{ color: card.iconColor }} />
                <span className="text-[10px] font-bold tracking-wide" style={{ color: C.textSecondary }}>{card.label}</span>
              </div>
              <p className="text-xl font-bold" style={{ color: C.textPrimary }}>{card.value}</p>
              <p className="text-[10px]" style={{ color: C.textTertiary }}>{card.sub}</p>
            </div>
          ))}
        </div>
        {/* Favorites Card */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: C.surfaceContainer }}>
          <div className="flex items-center gap-4 p-2 rounded-xl cursor-pointer" style={{ background: "transparent" }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${C.accent}1a` }}>
              <Music size={18} style={{ color: C.accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs" style={{ color: C.textSecondary }}>Current Playing</p>
              <p className="text-sm font-bold truncate" style={{ color: C.textPrimary }}>{activeTrack.title}</p>
              <p className="text-xs" style={{ color: C.textSecondary }}>{activeTrack.artist}</p>
            </div>
          </div>
          <div className="h-px my-3" style={{ background: `${C.textPrimary}1a` }} />
          <div className="flex items-center gap-4 p-2 rounded-xl cursor-pointer">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${C.textPrimary}0d` }}>
              <Heart size={18} style={{ color: C.accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs" style={{ color: C.textSecondary }}>Current Obsession</p>
              <p className="text-sm font-bold truncate" style={{ color: C.textPrimary }}>Neon Nights</p>
              <p className="text-xs" style={{ color: C.textSecondary }}>Synthwave Dreams</p>
            </div>
            <span className="text-xs font-bold" style={{ color: C.accent }}>30 plays</span>
          </div>
          <div className="h-px my-3" style={{ background: `${C.textPrimary}1a` }} />
          <div className="flex items-center gap-4 p-2 rounded-xl cursor-pointer">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${C.textPrimary}0d` }}>
              <Star size={18} style={{ color: C.gold }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs" style={{ color: C.textSecondary }}>All Time #1</p>
              <p className="text-sm font-bold truncate" style={{ color: C.textPrimary }}>Midnight Drive</p>
              <p className="text-xs" style={{ color: C.textSecondary }}>Retro Audio</p>
            </div>
            <span className="text-xs font-bold" style={{ color: C.gold }}>142 plays</span>
          </div>
        </div>
        {/* Curated Section */}
        <div className="flex items-center gap-2 mb-3">
          <Star size={14} style={{ color: C.accent }} />
          <span className="text-sm font-bold" style={{ color: C.textPrimary }}>Hokage Selections</span>
        </div>
        <div className="rounded-3xl aspect-[16/9] mb-4 flex items-center justify-center overflow-hidden" style={{ background: C.surfaceContainer }}>
          <div className="text-center">
            <Music size={32} style={{ color: C.textTertiary }} />
            <p className="text-xs mt-2" style={{ color: C.textTertiary }}>Featured Track</p>
          </div>
        </div>
        {mockTracks.slice(0, 3).map((t, i) => (
          <div key={t.id} className="flex items-center gap-4 py-3 px-2 cursor-pointer">
            <span className="text-xs w-5 text-right font-mono" style={{ color: C.textTertiary }}>0{i + 1}</span>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: C.surfaceHigh }}>
              <Music size={16} style={{ color: C.textTertiary }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: C.textPrimary }}>{t.title}</p>
              <p className="text-xs" style={{ color: C.textSecondary }}>{t.artist}</p>
            </div>
            <ChevronRight size={16} style={{ color: C.textTertiary }} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full rounded-lg overflow-hidden relative font-sans" style={{ background: C.bg, color: C.textPrimary }}>
      <div className="flex flex-col h-full min-h-[620px] relative">
        {!showNowPlaying && <Header />}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {showNowPlaying ? (
            <NowPlayingScreen />
          ) : (
            <>
              {mainTab === 0 && <VideosTab />}
              {mainTab === 1 && <MusicTab />}
              {mainTab === 2 && <ImagesTab />}
              {mainTab === 3 && <StatsTab />}
            </>
          )}
        </div>

        {/* MiniPlayer + BottomNav */}
        {!showNowPlaying && <MiniPlayer />}
        {!showNowPlaying && <BottomNav />}
      </div>

      {/* Quick Start */}
      {!quickStartDone && projectData?.quickStartSteps && projectData.quickStartSteps.length > 0 && (
        <DemoQuickStart projectId="fastbeat-media-player" steps={projectData.quickStartSteps} onComplete={() => setQuickStartDone(true)} />
      )}
    </div>
  );
}
