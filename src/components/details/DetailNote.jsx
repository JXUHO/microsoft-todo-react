import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNoteTodo } from "../../store/todoSlice";
import { useRef } from "react";

import TextareaAutosize from "react-textarea-autosize";

const DetailNote = ({ taskId }) => {
  const todo = useSelector((state) =>
    state.todo.todos.find((todo) => todo.id === taskId)
  );
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [note, setNote] = useState("");
  const [updatedText, setUpdatedText] = useState("");

  const noteInputHandler = (event) => {
    setNote(event.target.value);
  };

  const blurHandler = () => {
    dispatch(addNoteTodo({ id: taskId, content: note }));
  };

  const noteSectionClickHandler = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    setNote(todo.note.content);
  }, [todo.note.content]);

  useEffect(() => {
    if (todo.note.updated) {
      setUpdatedText(timeAgo(new Date(todo.note.updated)));
    }
  }, [todo.note.updated]);

  return (
    <div
      className="flex flex-col p-4 rounded my-2 bg-white justify-center border border-transparent hover:border-gray-300 hover:cursor-text"
      onClick={noteSectionClickHandler}
    >
      <TextareaAutosize
        ref={inputRef}
        type="text"
        placeholder="Add note"
        className="placeholder:text-gray-500"
        style={{ outline: "none", resize: "none" }}
        onChange={noteInputHandler}
        value={note}
        onBlur={blurHandler}
      />
      <div className="flex mt-6 text-xs" style={{ color: "#767678" }}>
        {todo.note.updated && <p>Updated {updatedText}</p>}
      </div>
    </div>
  );
};

export default DetailNote;

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  if (interval === 1) {
    return "last year";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  if (interval === 1) {
    return "last month";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  if (interval === 1) {
    return "yesterday";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  if (interval === 1) {
    return "an hour ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  if (interval === 1) {
    return "a minute ago";
  }

  return "a few seconds ago";
};
