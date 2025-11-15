//@ts-nocheck
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/home";
import { useEffect } from "react";
import { twJoin } from "tailwind-merge";
import { NavBar } from "./components/navbar";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

/**
 * @typedef {import("react").HTMLProps & import("react").HTMLAttributes} JSXProps
 */
function App() {
  useEffect(() => {
    if (
      localStorage.getItem("dark") !== "false" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className={twJoin("wh-full flex-col flex-center")}>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SidebarProvider>
  );
}

export default App;
