import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { repeatDueSynchronizer } from "../utils/repeatTask";
import { isDateToday } from "../utils/getDates";


/**
 * TODO
 * injectEndpoints 이용해서 slice쪼개기
 * folder structure features로 변경하기
 */

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["todos"],
  endpoints: (builder) => ({


    getTodosApi: builder.query({
      async queryFn(user) {
        try {
          const querySnapshot = await getDocs(
            collection(db, `users/${user.uid}/todos`)
          );
          let todosArr = [];
          querySnapshot?.forEach((doc) => {
            todosArr.push(doc.data());
          });

          return { data: todosArr };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["todos"],
    }),


    addTodoApi: builder.mutation({
      async queryFn({ todo, user }) {
        try {
          const modifiedDue = repeatDueSynchronizer(todo);
          if (modifiedDue) {
            todo = {
              ...todo,
              dueDate: modifiedDue.toISOString(),
            };
          }

          if (!todo.myday) {
            if (isDateToday(new Date(todo.dueDate))) {
              await addDoc(collection(db, `users/${user.uid}`), {
                ...todo,
                myday: true,
              });
            } else {
              await addDoc(collection(db, `users/${user.uid}`), {
                ...todo,
                myday: false,
              });
            }
          } else {
            const docRef = doc(db, "users", user.uid);
            const colRef = collection(docRef, "todos");
            await addDoc(colRef, todo)
          }
          return { data: null };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"],
    }),

    removeTodoApi: builder.mutation({
      async queryFn({ todo, user }) {
        try {
          
        } catch (error) {
          
        }
      }
    }),

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },


  }),
});

export const { useGetTodosApiQuery, useAddTodoApiMutation } = apiSlice;
