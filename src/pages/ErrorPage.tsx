import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    let title = "An unexpected error occurred";
    let description = "Our team has been notified of this dashboard anomaly.";
    
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            title = "Page Not Found";
            description = "The requested dynamic view path does not exist.";
        } else if (error.status === 500) {
            title = "Internal Server Fault";
            description = "The application server failed to resolve this workflow context.";
        }
    }
    
    return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 text-center p-4">
      <h1 className="text-6xl font-black text-zinc-900 tracking-tight mb-4">Oops!</h1>
      <h2 className="text-xl font-semibold text-zinc-700 mb-2">{title}</h2>
      <p className="text-zinc-500 max-w-sm mb-6">{description}</p>
      <Link to="/" className="rounded-lg bg-zinc-900 px-5 py-2.5 font-medium text-white shadow transition hover:bg-zinc-800">
        Return Home
      </Link>
    </div>
  );
}