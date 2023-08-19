import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import MydayPage from "./pages/MydayPage";
import RootPage from "./pages/RootPage";
import ImportantPage from "./pages/ImportantPage";
import PlannedPage from "./pages/PlannedPage";
import AssignedToMe from "./pages/AssignedToMePage";
import FlaggedPage from "./pages/FlaggedPage";
import Inbox from "./pages/InboxPage";

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
        path: "assigned_to_me",
        element: <AssignedToMe/>
      },
      {
        path: "flagged",
        element: <FlaggedPage/>
      },
      {
        path: "inbox",
        element: <Inbox/>
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
 * (fixed) ms todo app redirect https://to-do.office.com/ -> https://to-do.office.com/tasks/today 
 * 
 * 
 * 
 * 
 */

