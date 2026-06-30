"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="rounded-[14px] border border-border/60 bg-surface p-6 text-center">
          <p className="text-sm text-muted-foreground">Terjadi kesalahan</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 rounded-[8px] bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-all hover:bg-primary/20"
          >
            Coba lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
