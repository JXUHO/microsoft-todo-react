import { fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
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
          await setDoc(doc(db, `users/${user.uid}/ui`, "uiDoc"), {
            detailWidth: value,
          });
          return { data: null };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },



      async onQueryStarted(
        { user, value },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          firestoreApi.util.updateQueryData(
            "getUiApi",
            user.uid,
            (draft) => {
              // console.log(JSON.stringify(draft));
              draft["detailWidth"] = value
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },


      // invalidatesTags: ["ui"],
    }),
  }),
});

export const { useGetUiApiQuery, useSetDetailWidthApiMutation } = uiApiSlice;


