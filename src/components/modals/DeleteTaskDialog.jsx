import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { closeDetail, setDialog } from "../../store/uiSlice";
import { removeTodo } from "../../store/todoSlice";
import { useRemoveTodoApiMutation } from "../../api/todoApiSlice";

function DeleteTaskDialog() {
  const dispatch = useDispatch();
  const activeTasksId = useSelector((state) => state.active.activeTasks);
  const isDeleteDialogOpen = useSelector((state) => state.ui.dialog);

  const { refs, context } = useFloating({
    open: isDeleteDialogOpen,
    onOpenChange: (input) => dispatch(setDialog(input)),
  });
  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const { getFloatingProps } = useInteractions([click, role, dismiss]);
  const todos = useSelector(state => state.todo.todos)

  
  const [removeTodoApi] = useRemoveTodoApiMutation()
  const user = useSelector(state => state.auth.user)


  const deleteTaskHandler = () => {
    activeTasksId.forEach((todoId) => {

        removeTodoApi({todoId, user})


    });
    dispatch(closeDetail());
    dispatch(setDialog(false));
  };

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  };

  return (
    <>
      <FloatingPortal id="root">
          <FloatingOverlay
            className="flex items-center justify-center z-50"
            lockScroll
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <FloatingFocusManager context={context}>
              <div
                className="bg-white min-w-[288px] min-h-[176px] rounded flex flex-col"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px, rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px",
                  border: "solid 1px #edebe9",
                }}
                ref={refs.setFloating}
                {...getFloatingProps()}
              >
                <div className="p-4">
                  <div className="font-semibold mb-3">
                    {activeTasksId.length === 1 ? (
                      <div className="text-black">
                        <span>{`"${truncateString(
                          todos.find((todo) => todo.id === activeTasksId[0])
                            .task,
                          20
                        )}"`}</span>
                        <span> will be permanently deleted.</span>
                      </div>
                    ) : (
                      <span>
                        Are you sure you want to permanently delete these tasks?
                      </span>
                    )}
                  </div>
                  <span className="text-ms-light-text">
                    You won't be able to undo this action.
                  </span>
                </div>
                <div className="flex justify-end p-4">
                  <button
                    className="bg-ms-input-hover font-semibold py-2 px-3 w-auto h-auto rounded hover:bg-gray-200 transition-colors"
                    style={{ color: "#34373d" }}
                    onClick={() => dispatch(setDialog(false))}
                  >
                    Cancel
                  </button>
                  <button
                    className="ml-2 font-semibold py-2 px-3 w-auto h-auto rounded text-white bg-ms-warning hover:bg-red-800 transition-colors"
                    onClick={deleteTaskHandler}
                  >
                    Delete task
                  </button>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
      </FloatingPortal>
    </>
  );
}

export default DeleteTaskDialog;
