import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS directly
import type { Route } from "./+types/root";

import "./app.css";
import { useEffect } from "react";
import { useFinanceStore } from "./Componets/states/states";

config.autoAddCss = false;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }, // Standardized public link tracking
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { fetchUserData, isLoading, error } = useFinanceStore();

  useEffect(() => {
    // Fetch data for user ID 1 on mount
    fetchUserData(1);
  }, [fetchUserData]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif', color: '#64748b' }}>
        Loading ClearRupee Workspace...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px', color: '#ef4444', fontFamily: 'sans-serif' }}>
        <strong>Workspace Boot Error:</strong> {error}
      </div>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ClearRupee</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// FIX: Completely clean global wrapper. 
// No navbar is forced here, allowing Signuppage and Loginpage to render full-screen.
export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto" style={{ fontFamily: 'sans-serif' }}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto" style={{ backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}