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
import SearchPage from "./pages/SearchPage";
import Inbox from "./components/Inbox";

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
        element: <Inbox/>
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
 * (complete) complete탭 task 순서 수정하기
 * (complete) Detail resizer <-> popover랑 겹치면 UI 오류발생 -> 안겹치게 바꾸기
 * 
 * 
 * make right click modal
 * 삭제 모달
 * 
 * activated task blue color  
 * AddTask component retracted

 * Searchbar
 * dueDate가 설정되지 않더라도, 날짜 지나면 myday=false로 변경됨
 * taskList component scroll 가능하게 만들기
 * 
 * RepeatPopover -> useRepeatTasks 함수 호출 위치 고민해보기 -> repeat설정된 task가 완료되면 새로운 task생성하는 역할
 * 
 * floating ui -> useListNavigation 사용, 방향키로 선택 가능하도록 설정하기
 * 
 * 
 * UI -> task list scrollbar 생성될 때, taskItem 가로길이 바뀜. scrollbar 유무에 따라 padding 동적으로 변경하기
 * 
 * taskDetail file 첨부했을때, 백엔드 저장 구현하기
 * myday처리, repeat완료됐을 때 다음 repeat task생성 로직 백엔드에서 구현하기
 * 
 */

