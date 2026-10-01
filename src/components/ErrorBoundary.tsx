import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = { hasError: false };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("Uncaught runtime exception:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 text-center">
                    <div className="rounded-xl bg-white p-8 shadow-md border border-zinc-200 max-w-md">
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Something went sideways</h2>
                        <p className="text-zinc-600 mb-6">A critical rendering error occurred inside this application module.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-zinc-800"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}