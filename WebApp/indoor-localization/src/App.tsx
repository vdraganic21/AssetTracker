import { RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Router } from "@remix-run/router";

function App({ router }: { router: Router }) {
  return (
    <div className="application">
      <Header />
      <div className="content">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
