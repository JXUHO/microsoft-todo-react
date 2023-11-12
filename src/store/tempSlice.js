
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {db} from '../firebase'

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['todos'],
  endpoints: (builder) => ({
    addTodo: builder.query({
      async queryFn() {
        try {
          console.log('');
          return { data: null };
        } catch (error) {
          console.log(error);
          return { error: error.message };
        }
      },
      providesTags: ['todos'],
    }),
    
  })

})

export const {
  useFetchHighScoresTablesQuery,
  useSetNewHighScoreMutation,
} = firestoreApi;