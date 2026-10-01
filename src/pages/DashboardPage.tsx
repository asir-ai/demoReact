import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMetrics() {
            try {
                setLoading(true);
                setApiError(null);

                await new Promise((_, reject) => setTimeout(() => reject(new Error("Failed to fetch analytics payload data.")), 1200));

                setData("Successful Metric Payload");
            } catch (err) {
                const message = err instanceof Error ? err.message : "Fatal unexpected infrastructure error";
                setApiError(message);
            } finally {
                setLoading(false);
            }
        }

        fetchMetrics();
    }, []);
    
    return (
    <div className="rounded-2xl border border-zinc-200 p-8 shadow-sm flex flex-col items-center">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Metrics Dashboard</h1>

      {loading && (
        <div className="flex items-center gap-2 text-zinc-500 text-sm">
          <Loader2 className="animate-spin h-4 w-4" /> Resolving background network states...
        </div>
      )}

      {/* Graceful Async State Handling without breaking UI layout */}
      {apiError && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 max-w-xl">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Async Operations Fault</h4>
            <p className="text-xs text-amber-700 mt-0.5">{apiError}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-xs font-bold text-amber-900 underline mt-2 block hover:text-amber-950 cursor-pointer"
            >
              Retry Connection Workflow
            </button>
          </div>
        </div>
      )}

      {data && <p className="text-zinc-700 font-mono text-sm bg-zinc-50 p-4 border rounded-xl">{data}</p>}
    </div>
  );
}