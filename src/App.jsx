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
 * (complete) TaskDetail에서 redux저장소에서 데이터 가지고와서 detail body 구현하기
 * (complete) basic layout
 * (complete)testfield code 해석하기
 * Header search bar
 * AddTask.js fix payload (considering delete item using id)
 * implement steps
 * (complete) implement date/remind/repeat compoenent popover
 * 
 * make right click modal
 * activated task blue color
 * AddTask retracted
 * detail page
 * Searchbar
 * 
 * 
 * 
 * 
 * 
 * 
 */

