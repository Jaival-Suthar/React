import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";

import "./index.css";
// PrimeReact styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { ProgressSpinner } from "primereact/progressspinner";

// Lazy load heavy or rarely used routes for better performance
const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

// Layout component wraps all routes with Header and an outlet for nested routing
const AppLayout = () => (
  <div className="app">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);

// Loader spinner shown during lazy loading for UX
const LoadingSpinner = () => (
  <div className="flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <ProgressSpinner />
  </div>
);

// Define your routes including error boundaries, lazy loading, and nested routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <Suspense fallback={<LoadingSpinner />}><About /></Suspense> },
      { path: "/contact", element: <Contact /> },
      { path: "/grocery", element: <Suspense fallback={<LoadingSpinner />}><Grocery /></Suspense> },
      { path: "/restaurants/:resId", element: <RestaurantMenu /> },
    ],
  },
]);

// React 18 concurrent root rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={appRouter} />
);
