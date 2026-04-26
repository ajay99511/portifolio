"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bolt,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ListChecks,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouteHistory } from "@/components/demos/useRouteHistory";

type TaskType = "work" | "personal" | "health" | "leisure";
type TodoTab = "notes" | "timers" | "lists";

interface ChronosTask {
  id: string;
  title: string;
  start: string;
  end: string;
  type: TaskType;
  priority: "low" | "medium" | "high";
  completed: boolean;
  estimatedCost: number;
  description: string;
}

interface DayPlan {
  day: string;
  date: string;
  tasks: ChronosTask[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  tasks: Omit<ChronosTask, "id" | "completed">[];
}

interface NoteItem {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

interface TimerItem {
  id: string;
  title: string;
  minutes: number;
  description: string;
}

interface ListItem {
  id: string;
  title: string;
  items: { id: string; text: string; done: boolean }[];
}

type ChronosRoute =
  | { screen: "schedule" }
  | { screen: "workplans" }
  | { screen: "analytics" }
  | { screen: "tasks"; tab: TodoTab }
  | { screen: "timer"; timerId: string }
  | { screen: "focus" };

const dayPlansSeed: DayPlan[] = [
  {
    day: "Mon",
    date: "Apr 27",
    tasks: [
      {
        id: "c-task-1",
        title: "Deep Work Block",
        start: "08:00",
        end: "10:30",
        type: "work",
        priority: "high",
        completed: false,
        estimatedCost: 0,
        description: "Implement repository sync layer and schema checks.",
      },
      {
        id: "c-task-2",
        title: "Strength Session",
        start: "18:00",
        end: "19:00",
        type: "health",
        priority: "medium",
        completed: true,
        estimatedCost: 0,
        description: "Gym session with progressive overload split.",
      },
    ],
  },
  {
    day: "Tue",
    date: "Apr 28",
    tasks: [
      {
        id: "c-task-3",
        title: "Architecture Review",
        start: "09:30",
        end: "11:00",
        type: "work",
        priority: "high",
        completed: false,
        estimatedCost: 0,
        description: "Review provider and template interaction contracts.",
      },
      {
        id: "c-task-4",
        title: "Family Dinner",
        start: "19:30",
        end: "21:00",
        type: "personal",
        priority: "medium",
        completed: false,
        estimatedCost: 65,
        description: "Dinner reservation and travel buffer.",
      },
    ],
  },
  { day: "Wed", date: "Apr 29", tasks: [] },
  { day: "Thu", date: "Apr 30", tasks: [] },
  { day: "Fri", date: "May 1", tasks: [] },
  { day: "Sat", date: "May 2", tasks: [] },
  { day: "Sun", date: "May 3", tasks: [] },
];

const templateSeed: Template[] = [
  {
    id: "template-1",
    name: "Deep Work Friday",
    description: "Focus-heavy coding flow with low context switching.",
    tasks: [
      {
        title: "Feature Build Sprint",
        start: "08:30",
        end: "12:00",
        type: "work",
        priority: "high",
        estimatedCost: 0,
        description: "Main implementation sprint with notifications muted.",
      },
      {
        title: "Walk + Lunch Reset",
        start: "12:00",
        end: "13:00",
        type: "health",
        priority: "medium",
        estimatedCost: 22,
        description: "Walk break and meal recovery window.",
      },
    ],
  },
  {
    id: "template-2",
    name: "Lazy Sunday",
    description: "Recovery-oriented personal day.",
    tasks: [
      {
        title: "Long-form Reading",
        start: "10:00",
        end: "11:30",
        type: "leisure",
        priority: "low",
        estimatedCost: 0,
        description: "Read 2 chapters without interruptions.",
      },
      {
        title: "Weekly Reflection",
        start: "17:00",
        end: "17:45",
        type: "personal",
        priority: "medium",
        estimatedCost: 0,
        description: "Review wins, bottlenecks, and next-week intent.",
      },
    ],
  },
];

function formatSeconds(total: number) {
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function parseDurationHours(start: string, end: string) {
  const [sH, sM] = start.split(":").map(Number);
  const [eH, eM] = end.split(":").map(Number);
  const startMinutes = sH * 60 + sM;
  const endMinutes = eH * 60 + eM;
  const raw = endMinutes <= startMinutes ? endMinutes + 24 * 60 - startMinutes : endMinutes - startMinutes;
  return raw / 60;
}

function taskTypeColor(type: TaskType) {
  if (type === "work") return "text-blue-300";
  if (type === "personal") return "text-purple-300";
  if (type === "health") return "text-emerald-300";
  return "text-amber-300";
}

export default function ChronosPlannerDemo() {
  const history = useRouteHistory<ChronosRoute>({ screen: "schedule" });
  const [days, setDays] = useState<DayPlan[]>(dayPlansSeed);
  const [templates, setTemplates] = useState<Template[]>(templateSeed);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [sortAsc, setSortAsc] = useState(true);
  const [scheduleMode, setScheduleMode] = useState<"card" | "list">("card");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [todoTab, setTodoTab] = useState<TodoTab>("notes");
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: "note-1",
      title: "Migration Notes",
      description: "Track v4→v5 schema and edge cases for overnight tasks.",
      done: false,
    },
    {
      id: "note-2",
      title: "UX Polish",
      description: "Focus HUD contrast adjustment for light monitors.",
      done: true,
    },
  ]);
  const [timers, setTimers] = useState<TimerItem[]>([
    {
      id: "timer-1",
      title: "Deep Focus Sprint",
      minutes: 25,
      description: "Pomodoro run for repository refactor.",
    },
    {
      id: "timer-2",
      title: "Break Timer",
      minutes: 5,
      description: "Short recovery loop between sessions.",
    },
  ]);
  const [lists, setLists] = useState<ListItem[]>([
    {
      id: "list-1",
      title: "Release Checklist",
      items: [
        { id: "li-1", text: "Run migrations", done: true },
        { id: "li-2", text: "Verify recurring templates", done: false },
        { id: "li-3", text: "Smoke test timer workflow", done: false },
      ],
    },
  ]);
  const [timerRuntime, setTimerRuntime] = useState<Record<string, { remaining: number; running: boolean }>>({});

  const route = history.current;
  const currentDay = days[selectedDayIndex];

  const activeTodoTab = route.screen === "tasks" ? route.tab : todoTab;
  const activeTimerId = route.screen === "timer" ? route.timerId : null;
  const activeTimerState = activeTimerId ? timerRuntime[activeTimerId] : undefined;

  useEffect(() => {
    if (!activeTimerId || !activeTimerState?.running) return;
    const interval = window.setInterval(() => {
      setTimerRuntime((prev) => {
        const runtime = prev[activeTimerId];
        if (!runtime) return prev;
        if (runtime.remaining <= 1) {
          return {
            ...prev,
            [activeTimerId]: { ...runtime, remaining: 0, running: false },
          };
        }
        return {
          ...prev,
          [activeTimerId]: { ...runtime, remaining: runtime.remaining - 1 },
        };
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [activeTimerId, activeTimerState?.running]);

  const sortedTasks = useMemo(() => {
    const cloned = [...currentDay.tasks];
    cloned.sort((a, b) => (sortAsc ? a.start.localeCompare(b.start) : b.start.localeCompare(a.start)));
    return cloned;
  }, [currentDay.tasks, sortAsc]);

  const selectedTask = sortedTasks.find((task) => task.id === selectedTaskId) ?? null;

  const analytics = useMemo(() => {
    const tasks = days.flatMap((day) => day.tasks);
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const totalHours = tasks.reduce((sum, task) => sum + parseDurationHours(task.start, task.end), 0);
    const totalCost = tasks.reduce((sum, task) => sum + task.estimatedCost, 0);
    const efficiency = total === 0 ? 0 : Math.round((completed / total) * 100);

    const byType = tasks.reduce<Record<TaskType, number>>(
      (acc, task) => {
        acc[task.type] += parseDurationHours(task.start, task.end);
        return acc;
      },
      { work: 0, personal: 0, health: 0, leisure: 0 },
    );

    const hourScore = new Map<number, number>();
    tasks.forEach((task) => {
      const hour = Number(task.start.split(":")[0]);
      hourScore.set(hour, (hourScore.get(hour) ?? 0) + (task.completed ? 1 : 0.35));
    });

    let peakHour = "N/A";
    if (hourScore.size > 0) {
      const [bestHour] = [...hourScore.entries()].sort((a, b) => b[1] - a[1])[0];
      const suffix = bestHour >= 12 ? "PM" : "AM";
      const formatted = bestHour % 12 === 0 ? 12 : bestHour % 12;
      peakHour = `${formatted} ${suffix}`;
    }

    return { total, completed, totalHours, totalCost, efficiency, byType, peakHour };
  }, [days]);

  const activeScreen =
    route.screen === "timer" ? "tasks" : route.screen === "focus" ? "focus" : route.screen;

  const navItems: { id: Exclude<ChronosRoute["screen"], "timer">; label: string; icon: typeof CalendarDays }[] = [
    { id: "schedule", label: "Schedule", icon: CalendarDays },
    { id: "workplans", label: "WorkPlans", icon: ClipboardList },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "tasks", label: "Tasks", icon: ListChecks },
    { id: "focus", label: "Focus HUD", icon: Bolt },
  ];

  const nextUnfinished = currentDay.tasks.find((task) => !task.completed) ?? null;

  const navigateMain = (target: Exclude<ChronosRoute["screen"], "timer">) => {
    if (target === "tasks") {
      history.push({ screen: "tasks", tab: activeTodoTab });
      return;
    }
    history.push({ screen: target });
  };

  const toggleTask = (taskId: string) => {
    setDays((prev) =>
      prev.map((day, index) =>
        index !== selectedDayIndex
          ? day
          : {
              ...day,
              tasks: day.tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
            },
      ),
    );
  };

  const addQuickTask = () => {
    const quickTask: ChronosTask = {
      id: `task-${Date.now()}`,
      title: "Quick Capture",
      start: "14:00",
      end: "14:45",
      type: "work",
      priority: "medium",
      completed: false,
      estimatedCost: 0,
      description: "New task added from demo quick-capture flow.",
    };
    setDays((prev) =>
      prev.map((day, index) => (index === selectedDayIndex ? { ...day, tasks: [...day.tasks, quickTask] } : day)),
    );
  };

  const applyTemplate = (template: Template) => {
    const mapped: ChronosTask[] = template.tasks.map((task, index) => ({
      ...task,
      id: `${template.id}-${Date.now()}-${index}`,
      completed: false,
    }));

    setDays((prev) =>
      prev.map((day, index) => (index === selectedDayIndex ? { ...day, tasks: [...day.tasks, ...mapped] } : day)),
    );
    history.push({ screen: "schedule" });
  };

  const createTemplateFromDay = () => {
    if (currentDay.tasks.length === 0) return;
    const clonedTemplate: Template = {
      id: `template-${Date.now()}`,
      name: `${currentDay.day} Snapshot`,
      description: "Saved from current day schedule in demo mode.",
      tasks: currentDay.tasks.map((task) => ({
        title: task.title,
        start: task.start,
        end: task.end,
        type: task.type,
        priority: task.priority,
        estimatedCost: task.estimatedCost,
        description: task.description,
      })),
    };
    setTemplates((prev) => [clonedTemplate, ...prev]);
    history.push({ screen: "workplans" });
  };

  const renderSchedule = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={`${day.day}-${day.date}`}
            onClick={() => setSelectedDayIndex(index)}
            className={cn(
              "rounded-md border px-2 py-3 text-left transition-colors",
              selectedDayIndex === index
                ? "border-indigo-400 bg-indigo-500/20"
                : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700",
            )}
          >
            <p className="font-mono text-[10px] uppercase text-zinc-500">{day.day}</p>
            <p className="text-sm font-bold">{day.date}</p>
            <p className="text-[10px] text-zinc-500">{day.tasks.length} tasks</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button onClick={addQuickTask} className="px-3 py-2 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider">
          <Plus size={14} className="inline mr-1" /> Add Task
        </button>
        <button
          onClick={() => setSortAsc((prev) => !prev)}
          className="px-3 py-2 border border-zinc-700 text-xs font-mono uppercase"
        >
          Sort {sortAsc ? "Asc" : "Desc"}
        </button>
        <button
          onClick={() => setScheduleMode((prev) => (prev === "card" ? "list" : "card"))}
          className="px-3 py-2 border border-zinc-700 text-xs font-mono uppercase"
        >
          View {scheduleMode === "card" ? "Cards" : "List"}
        </button>
        <button onClick={createTemplateFromDay} className="px-3 py-2 border border-zinc-700 text-xs font-mono uppercase">
          Save as Template
        </button>
      </div>

      <div className={cn("gap-3", scheduleMode === "card" ? "grid md:grid-cols-2" : "grid grid-cols-1")}>
        {sortedTasks.length === 0 ? (
          <div className="border border-dashed border-zinc-700 rounded-md p-6 text-zinc-500 font-mono text-xs uppercase">
            No tasks for this day. Apply a template from WorkPlans.
          </div>
        ) : (
          sortedTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => setSelectedTaskId(task.id)}
              className={cn(
                "text-left rounded-md border p-4 transition-colors",
                "border-zinc-800 bg-zinc-900/60 hover:border-indigo-400/60",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="font-mono text-[11px] text-zinc-500">{task.start} - {task.end}</p>
                </div>
                <span className={cn("text-[10px] font-mono uppercase", taskTypeColor(task.type))}>{task.type}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{task.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleTask(task.id);
                  }}
                  className={cn(
                    "text-xs font-mono uppercase px-2 py-1 border",
                    task.completed ? "border-emerald-500/50 text-emerald-300" : "border-zinc-700 text-zinc-400",
                  )}
                >
                  {task.completed ? "Completed" : "Mark Done"}
                </button>
                <span className="text-xs text-zinc-500">${task.estimatedCost.toFixed(0)}</span>
              </div>
            </button>
          ))
        )}
      </div>

      {selectedTask ? (
        <div className="border border-indigo-500/40 bg-indigo-500/10 rounded-md p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{selectedTask.title}</h4>
            <button onClick={() => setSelectedTaskId(null)} className="text-xs font-mono uppercase text-zinc-400">
              Close
            </button>
          </div>
          <p className="mt-2 text-sm text-zinc-300">{selectedTask.description}</p>
          <p className="mt-2 font-mono text-xs text-zinc-400">
            {selectedTask.start} - {selectedTask.end} | {selectedTask.priority.toUpperCase()} PRIORITY
          </p>
        </div>
      ) : null}
    </div>
  );

  const renderWorkPlans = () => (
    <div className="grid gap-3 md:grid-cols-2">
      {templates.map((template) => (
        <article key={template.id} className="border border-zinc-800 bg-zinc-900/60 rounded-md p-4 space-y-3">
          <div>
            <p className="font-semibold">{template.name}</p>
            <p className="text-sm text-zinc-400">{template.description}</p>
          </div>
          <p className="font-mono text-[11px] uppercase text-zinc-500">{template.tasks.length} template tasks</p>
          <button onClick={() => applyTemplate(template)} className="px-3 py-2 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider">
            Apply to {currentDay.day}
          </button>
        </article>
      ))}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-3">
        <div className="border border-zinc-800 rounded-md p-3 bg-zinc-900/60">
          <p className="font-mono text-[10px] uppercase text-zinc-500">Efficiency</p>
          <p className="text-2xl font-bold">{analytics.efficiency}%</p>
        </div>
        <div className="border border-zinc-800 rounded-md p-3 bg-zinc-900/60">
          <p className="font-mono text-[10px] uppercase text-zinc-500">Tasks</p>
          <p className="text-2xl font-bold">{analytics.completed}/{analytics.total}</p>
        </div>
        <div className="border border-zinc-800 rounded-md p-3 bg-zinc-900/60">
          <p className="font-mono text-[10px] uppercase text-zinc-500">Focus Hours</p>
          <p className="text-2xl font-bold">{analytics.totalHours.toFixed(1)}h</p>
        </div>
        <div className="border border-zinc-800 rounded-md p-3 bg-zinc-900/60">
          <p className="font-mono text-[10px] uppercase text-zinc-500">Peak Hour</p>
          <p className="text-2xl font-bold">{analytics.peakHour}</p>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-md p-4 bg-zinc-900/60 space-y-2">
        <p className="font-mono text-[10px] uppercase text-zinc-500">Category Distribution</p>
        {(Object.keys(analytics.byType) as TaskType[]).map((type) => {
          const value = analytics.byType[type];
          const denominator = analytics.totalHours <= 0 ? 1 : analytics.totalHours;
          return (
            <div key={type} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className={taskTypeColor(type)}>{type.toUpperCase()}</span>
                <span className="text-zinc-400">{value.toFixed(1)}h</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded">
                <div className="h-full bg-indigo-400 rounded" style={{ width: `${Math.max(6, (value / denominator) * 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <p className="font-mono text-xs text-zinc-500 uppercase">Estimated Weekly Spend: ${analytics.totalCost.toFixed(0)}</p>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["notes", "timers", "lists"] as TodoTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setTodoTab(tab);
              history.push({ screen: "tasks", tab });
            }}
            className={cn(
              "px-3 py-2 text-xs uppercase font-mono border",
              activeTodoTab === tab ? "border-indigo-400 bg-indigo-500/20 text-white" : "border-zinc-700 text-zinc-400",
            )}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => {
            if (activeTodoTab === "notes") {
              setNotes((prev) => [
                ...prev,
                {
                  id: `note-${Date.now()}`,
                  title: "New Note",
                  description: "Captured from the NewItemSheet style flow.",
                  done: false,
                },
              ]);
            } else if (activeTodoTab === "timers") {
              setTimers((prev) => [
                ...prev,
                {
                  id: `timer-${Date.now()}`,
                  title: "Generated Focus Timer",
                  minutes: 15,
                  description: "Quick timer created from tasks panel.",
                },
              ]);
            } else {
              setLists((prev) => [
                ...prev,
                {
                  id: `list-${Date.now()}`,
                  title: "New Checklist",
                  items: [
                    { id: `item-${Date.now()}-1`, text: "First checklist item", done: false },
                    { id: `item-${Date.now()}-2`, text: "Second checklist item", done: false },
                  ],
                },
              ]);
            }
          }}
          className="ml-auto px-3 py-2 text-xs uppercase font-bold bg-indigo-500 text-white"
        >
          <Plus size={14} className="inline mr-1" /> New
        </button>
      </div>

      {activeTodoTab === "notes"
        ? notes.map((note) => (
            <article key={note.id} className="border border-zinc-800 bg-zinc-900/60 rounded-md p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{note.title}</h4>
                <button
                  onClick={() =>
                    setNotes((prev) => prev.map((item) => (item.id === note.id ? { ...item, done: !item.done } : item)))
                  }
                  className={cn(
                    "text-xs font-mono uppercase px-2 py-1 border",
                    note.done ? "border-emerald-500/50 text-emerald-300" : "border-zinc-700 text-zinc-400",
                  )}
                >
                  {note.done ? "Done" : "Pending"}
                </button>
              </div>
              <p className="mt-2 text-sm text-zinc-400">{note.description}</p>
            </article>
          ))
        : null}

      {activeTodoTab === "timers"
        ? timers.map((timerItem) => (
            <article key={timerItem.id} className="border border-zinc-800 bg-zinc-900/60 rounded-md p-4 flex items-center justify-between gap-3">
              <div>
                <h4 className="font-semibold">{timerItem.title}</h4>
                <p className="text-sm text-zinc-400">{timerItem.minutes} minutes | {timerItem.description}</p>
              </div>
              <button
                onClick={() => {
                  setTimerRuntime((prev) => ({
                    ...prev,
                    [timerItem.id]: prev[timerItem.id] ?? {
                      remaining: timerItem.minutes * 60,
                      running: false,
                    },
                  }));
                  history.push({ screen: "timer", timerId: timerItem.id });
                }}
                className="px-3 py-2 bg-indigo-500 text-white text-xs font-bold uppercase"
              >
                Start
              </button>
            </article>
          ))
        : null}

      {activeTodoTab === "lists"
        ? lists.map((list) => (
            <article key={list.id} className="border border-zinc-800 bg-zinc-900/60 rounded-md p-4">
              <h4 className="font-semibold">{list.title}</h4>
              <div className="mt-2 space-y-1">
                {list.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setLists((prev) =>
                        prev.map((entry) =>
                          entry.id !== list.id
                            ? entry
                            : {
                                ...entry,
                                items: entry.items.map((current) =>
                                  current.id === item.id ? { ...current, done: !current.done } : current,
                                ),
                              },
                        ),
                      )
                    }
                    className="w-full text-left text-sm flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} className={cn(item.done ? "text-emerald-300" : "text-zinc-600")} />
                    <span className={cn(item.done ? "line-through text-zinc-500" : "text-zinc-300")}>{item.text}</span>
                  </button>
                ))}
              </div>
            </article>
          ))
        : null}
    </div>
  );

  const renderTimer = () => {
    const targetTimer = route.screen === "timer" ? timers.find((timer) => timer.id === route.timerId) : undefined;
    if (!targetTimer || !activeTimerId) {
      return (
        <div className="border border-zinc-800 rounded-md p-6 text-zinc-500 font-mono text-xs uppercase">
          Timer data unavailable.
        </div>
      );
    }
    const runtime = timerRuntime[activeTimerId] ?? {
      remaining: targetTimer.minutes * 60,
      running: false,
    };

    return (
      <div className="border border-zinc-800 rounded-md p-6 bg-zinc-900/60 max-w-md">
        <p className="font-mono text-xs uppercase text-zinc-500">{targetTimer.title}</p>
        <p className="text-5xl font-bold mt-4 tracking-wide">{formatSeconds(runtime.remaining)}</p>
        <p className="text-sm text-zinc-400 mt-2">{targetTimer.description}</p>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() =>
              setTimerRuntime((prev) => ({
                ...prev,
                [activeTimerId]: {
                  remaining: (prev[activeTimerId]?.remaining ?? targetTimer.minutes * 60),
                  running: !(prev[activeTimerId]?.running ?? false),
                },
              }))
            }
            className="px-3 py-2 bg-indigo-500 text-white text-xs font-bold uppercase"
          >
            {runtime.running ? "Pause" : "Start"}
          </button>
          <button
            onClick={() =>
              setTimerRuntime((prev) => ({
                ...prev,
                [activeTimerId]: {
                  running: false,
                  remaining: targetTimer.minutes * 60,
                },
              }))
            }
            className="px-3 py-2 border border-zinc-700 text-xs font-mono uppercase"
          >
            Reset
          </button>
          <button
            onClick={() => history.push({ screen: "tasks", tab: "timers" })}
            className="px-3 py-2 border border-zinc-700 text-xs font-mono uppercase"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  };

  const renderFocusHud = () => (
    <div className="max-w-sm border border-indigo-500/40 bg-black/80 rounded-md p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 flex items-center gap-2">
        <Bolt size={12} /> Focus HUD
      </p>
      {nextUnfinished ? (
        <>
          <p className="mt-3 font-semibold">{nextUnfinished.title}</p>
          <p className="text-xs text-zinc-400">{nextUnfinished.start} - {nextUnfinished.end}</p>
          <button
            onClick={() => toggleTask(nextUnfinished.id)}
            className="mt-4 px-3 py-2 bg-indigo-500 text-white text-xs font-bold uppercase"
          >
            Mark Complete
          </button>
        </>
      ) : (
        <p className="mt-3 text-sm text-zinc-400">All tasks complete for this day.</p>
      )}
    </div>
  );

  return (
    <div className="h-full border border-zinc-800 bg-[#0b1120] text-white rounded-lg overflow-hidden">
      <div className="flex h-full min-h-[620px]">
        <aside className="w-56 border-r border-zinc-800 bg-[#111827] p-4 space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Chronos Home</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateMain(item.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors",
                  isActive ? "bg-indigo-500/20 text-white border border-indigo-400/40" : "text-zinc-400 hover:bg-zinc-800",
                )}
              >
                <Icon size={16} /> {item.label}
              </button>
            );
          })}
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="border-b border-zinc-800 px-4 py-3 flex items-center gap-2 bg-black/20">
            <button
              onClick={history.back}
              disabled={!history.canBack}
              className="p-2 border border-zinc-700 disabled:opacity-40"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={history.forward}
              disabled={!history.canForward}
              className="p-2 border border-zinc-700 disabled:opacity-40"
            >
              <ArrowRight size={14} />
            </button>
            <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 ml-2">
              {route.screen === "tasks" ? `tasks/${route.tab}` : route.screen}
            </p>
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            {route.screen === "schedule" ? renderSchedule() : null}
            {route.screen === "workplans" ? renderWorkPlans() : null}
            {route.screen === "analytics" ? renderAnalytics() : null}
            {route.screen === "tasks" ? renderTasks() : null}
            {route.screen === "timer" ? renderTimer() : null}
            {route.screen === "focus" ? renderFocusHud() : null}
          </main>
        </div>
      </div>
    </div>
  );
}
