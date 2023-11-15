import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import getNextRepeatTask, { repeatDueSynchronizer } from "../utils/repeatTask";
import { isDateToday } from "../utils/getDates";
import { firestoreApi } from "./firestoreApi";
import popSound from "../../public/popSound.mp3";

/**
 * TODO
 * injectEndpoints 이용해서 slice쪼개기
 * folder structure features로 변경하기
 */

export const todoApiSlice = firestoreApi.injectEndpoints({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodosApi: builder.query({
      async queryFn(userId) {
        if (!userId) {
          return { data: null };
        }
        try {
          const querySnapshot = await getDocs(
            collection(db, `users/${userId}/todos`)
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
              await setDoc(doc(db, `users/${user.uid}/todos`, todo.id), {
                ...todo,
                myday: true,
              });
            } else {
              await setDoc(doc(db, `users/${user.uid}/todos`, todo.id), {
                ...todo,
                myday: false,
              });
            }
          } else {
            await setDoc(doc(db, `users/${user.uid}/todos`, todo.id), todo);
          }
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"],
    }),
    removeTodoApi: builder.mutation({
      async queryFn({ todoId, user }) {
        try {
          await deleteDoc(doc(db, `users/${user.uid}/todos`, todoId));
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"],
    }),

    setCompleteTodoApi: builder.mutation({
      async queryFn({ todoId, user, value }) {
        try {
          const docSnap = await getDoc(
            doc(db, `users/${user.uid}/todos`, todoId)
          );
          const docData = docSnap.data()
          if(!value){
            await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            complete: ""
          });
          } else {
            new Audio(popSound).play();
            await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
              complete: new Date().toISOString(),
            });
            if(docData.repeatRule && !docData.repeated) {
              await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
                repeated: true,
              });
              const newRepeatTask = getNextRepeatTask(docData)
              await setDoc(doc(db, `users/${user.uid}/todos`, newRepeatTask.id), newRepeatTask);
            }
          }
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"],
    }),



    setImportanceTodoApi: builder.mutation({
      async queryFn({todoId, user, value}) {
        try {
          const docSnap = await getDoc(
            doc(db, `users/${user.uid}/todos`, todoId)
          );
          const docData = docSnap.data()
          
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            importance: value
          }); 
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),

    changeTaskTodoApi: builder.mutation({
      async queryFn({todoId, user, value}) {
        try {
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            task: value
          }); 
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),


    setMydayTodoApi: builder.mutation({
      async queryFn({todoId, user, value}) {
        try {
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            myday: value
          }); 
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),

    changeOptionTodoApi: builder.mutation({
      async queryFn({todoId, user, option, content, currentLocation}) {
        try {
          const docSnap = await getDoc(
            doc(db, `users/${user.uid}/todos`, todoId)
          );
          const docData = docSnap.data()
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            [option]: content
          }); 
          const modifiedDue = repeatDueSynchronizer(docData);

          if (modifiedDue) {
            await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
              dueDate: modifiedDue.toISOString()
            }); 
          }
          if (
            currentLocation !== "/myday" &&
            isDateToday(new Date(docData.dueDate))
          ) {
            await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
              myday: true
            }); 
          } else if (
            currentLocation !== "/myday" &&
            !isDateToday(new Date(docData.dueDate))
          ) {
            await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
              myday: false
            }); 
          }
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),

    setRemindedTodoApi: builder.mutation({
      async queryFn({todoId, user, value}) {
        try {
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            reminded: value
          }); 
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),


    addCategoryTodoApi: builder.mutation({
      async queryFn({todoId, user, category}) {
        try {
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            category: arrayUnion(category)
          }); 
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),



    removeCategoryTodoApi: builder.mutation({
      async queryFn({todoId, user, category}) {
        try {
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            category: arrayRemove(category)
          }); 
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),
    
    
    
    addNoteTodoApi: builder.mutation({
      async queryFn({todoId, user, content}) {
        try {
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            "note.content": content,
            "note.updated": new Date().toISOString()
          }); 
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),
  
    
    addStepApi: builder.mutation({
      async queryFn({todoId, user, value}) {
        try {
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            steps: arrayUnion(value)
          }); 
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),



    // completeStep: (state, action) => {
    //   const todoToChange = state.todos.find(
    //     (todo) => todo.id === action.payload.taskId
    //   );
    //   const stepToChange = todoToChange.steps.find(
    //     (step) => step.id === action.payload.stepId
    //   );
    //   if(!stepToChange.complete) new Audio(popSound).play()
    //   stepToChange.complete = !stepToChange.complete;
    // },


    completeStepApi: builder.mutation({
      async queryFn({todoId, user, stepId}) {
        /**
         * TODO
         * DetailStepItem component의 completeStepHandler와 연결된 api 작성중
         * todoId document / steps array field / 내부의 stepId와 일치하는 item의 complete를 변경해야함
         */

        try {

          // doc을 가지고와서 !complete값 구해야하나?
          await updateDoc(doc(db, `users/${user.uid}/todos`, todoId), {
            
          }); 

          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["todos"]
    }),












    // setMydayTodoApi: builder.mutation({
    //   async queryFn({todoId, user, value}) {
    //     try {
          

    //       return { data: null };
    //     } catch (error) {
    //       console.log(error.message);
    //       return { error: error.message };
    //     }
    //   },
    //   invalidatesTags: ["todos"]
    // }),





















  }),
});

export const {
  useGetTodosApiQuery,
  useAddTodoApiMutation,
  useRemoveTodoApiMutation,
  useSetCompleteTodoApiMutation,
  useSetImportanceTodoApiMutation,
  useChangeTaskTodoApiMutation,
  useSetMydayTodoApiMutation,
  useChangeOptionTodoApiMutation,
  useSetRemindedTodoApiMutation,
  useAddCategoryTodoApiMutation,
  useRemoveCategoryTodoApiMutation,
  useAddNoteTodoApiMutation,
  useAddStepApiMutation,
  useCompleteStepApiMutation,

  



} = todoApiSlice;
