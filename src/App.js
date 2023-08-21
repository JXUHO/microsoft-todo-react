import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import MydayPage from "./pages/MydayPage";
import RootPage from "./pages/RootPage";
import ImportantPage from "./pages/ImportantPage";
import PlannedPage from "./pages/PlannedPage";
import CompletedPage from "./pages/CompletedPage";
import AllTasksPage from "./pages/AllTasksPage";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage/>,
    children: [
      {
        index: true,
        loader: () => redirect("/today")
      },
      {
        path: "today",
        element: <MydayPage />,
      },
      {
        path: "myday",
        element: <MydayPage />,
      },
      {
        path: "important",
        element: <ImportantPage/>
      },
      {
        path: "planned",
        element: <PlannedPage/>
      },
      {
        path: "completed",
        element: <CompletedPage/>
      },
      {
        path: "inbox",
        element: <AllTasksPage/>
      },
      {
        path: "search",
        element: <SearchPage/>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;



/**
 * TODO
 * (complete) ms todo app redirect https://to-do.office.com/ -> https://to-do.office.com/tasks/today 
 * (complete) sidebar retraction
 * Header search bar
 * layout simple styling
 * 
 * AddTask.js fix payload (considering delete item using id)
 * work with Todos.js
 * 
 * 
 * 
 */

