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
import InboxPage from "./pages/InboxPage";

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
        element: <InboxPage />
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
 * (complete) activated task blue color  
 * (complete) UI -> searchbar x버튼 눌렀을 때 flickering문제 해결하기
 * (complete) Searchbar
 * (complete) taskList component scroll 가능하게 만들기
 * (complete) repeat완료됐을 때 다음 repeat task생성 로직 백엔드에서 구현하기(RootPage로 이동)
 * (complete) myday처리
 * 
 * 
 * 
 * 
 * make task context menu 기능 구현하기
 * 삭제 모달
 * 
 * AddTask component retracted
 * 
 * dueDate가 설정되지 않더라도, 날짜 지나면 myday=false로 변경됨
 * 
 * 
 * floating ui -> useListNavigation 사용, 방향키로 선택 가능하도록 설정하기
 * 
 * 
 * UI -> task list scrollbar 생성될 때, taskItem 가로길이 바뀜. scrollbar 유무에 따라 padding 동적으로 변경하기
 * 
 * taskDetail file 첨부했을때, 백엔드 저장 구현하기
 * 
 * 
 *
 * 
 * Popover, tooltip 독립된 component로 구현해서 코드 가독성 높이기
 * 
 * 
 * UI -> Sidebar mount될때, task 개수 0으로 표시됐다가 사라짐 -> flickering발생
 * 
 * Refactor -> GroupLists -> TaskHeader & TaskItemHeader 동일한 컴포넌트로 만들기
 * 
 * 
 * Task Item multi selection (shift, ctrl키)
 * 
 * PlannedList component next week text 변경하기
 * 
 * UI -> TaskItem myday sun icon 정렬 수정하기
 * 
 */

