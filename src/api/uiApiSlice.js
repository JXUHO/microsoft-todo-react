import { fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestoreApi } from "./firestoreApi";

export const uiApiSlice = firestoreApi.injectEndpoints({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["ui"],
  endpoints: (builder) => ({
    getUiApi: builder.query({
      async queryFn(userId) {
        if (!userId) {
          return { data: null };
        }
        try {
          const docRef = doc(db, `users/${userId}/ui`, "uiDoc");
          const docSnap = await getDoc(docRef);
          return { data: docSnap.data() };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["ui"],
    }),

    setDetailWidthApi: builder.mutation({
      async queryFn({ user, value }) {
        try {
          const docRef = doc(db, `users/${user.uid}/ui`, "uiDoc");
          await setDoc(
            docRef,
            {
              detailWidth: value,
            },
            { merge: true }
          );
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      async onQueryStarted({ user, value }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          firestoreApi.util.updateQueryData("getUiApi", user.uid, (draft) => {
            // console.log(JSON.stringify(draft));
            if (JSON.stringify(draft)) draft["detailWidth"] = value;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      // invalidatesTags: ["ui"],
    }),

    setThemeApi: builder.mutation({
      async queryFn({ user, value }) {
        try {
          const docRef = doc(db, `users/${user.uid}/ui`, "uiDoc");
          await setDoc(
            docRef,
            {
              theme: value,
            },
            { merge: true }
          );
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      async onQueryStarted({ user, value }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          firestoreApi.util.updateQueryData("getUiApi", user.uid, (draft) => {
            if (JSON.stringify(draft)) draft["theme"] = value;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },

      invalidatesTags: ["ui"],
    }),
  }),
});

export const {
  useGetUiApiQuery,
  useSetDetailWidthApiMutation,
  useSetThemeApiMutation,
} = uiApiSlice;
