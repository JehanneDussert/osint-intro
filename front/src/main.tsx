import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Wrapper } from "./components/Wrapper.tsx";
import { Home } from "./pages/Home.tsx";
import { Graphs } from "./pages/Graphs.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper>
      <Home />
    </Wrapper>,
  },
  {
    path: "/graphs",
    element: <Wrapper>
      <Graphs />
    </Wrapper>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
