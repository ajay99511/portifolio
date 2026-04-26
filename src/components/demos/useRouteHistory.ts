"use client";

import { useState } from "react";

interface HistoryState<T> {
  stack: T[];
  index: number;
}

export function useRouteHistory<T>(initialRoute: T) {
  const [state, setState] = useState<HistoryState<T>>({
    stack: [initialRoute],
    index: 0,
  });

  const current = state.stack[state.index];

  const push = (route: T) => {
    setState((prev) => ({
      stack: [...prev.stack.slice(0, prev.index + 1), route],
      index: prev.index + 1,
    }));
  };

  const back = () => {
    setState((prev) => ({
      ...prev,
      index: Math.max(0, prev.index - 1),
    }));
  };

  const forward = () => {
    setState((prev) => ({
      ...prev,
      index: Math.min(prev.stack.length - 1, prev.index + 1),
    }));
  };

  const reset = (route: T) => {
    setState({ stack: [route], index: 0 });
  };

  return {
    current,
    push,
    back,
    forward,
    reset,
    canBack: state.index > 0,
    canForward: state.index < state.stack.length - 1,
  };
}
