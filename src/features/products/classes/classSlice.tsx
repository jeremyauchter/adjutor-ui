import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/apiSlice";
import { Class } from "../../../models/class.model";


const classAdapter = createEntityAdapter()

const initialState = classAdapter.getInitialState({
    name: "",
    departmentName: ""
})

export interface ClassOptions {
    id: number
    name: string
}

const classOptionsAdapter = createEntityAdapter<ClassOptions>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  })

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClasses: builder.query< Class[], void>({
            query: () => 'classes',
            providesTags: (result) => 
            result
            ?[
                {type: 'Class', id: "LIST"},
                ...result.map(({id}) => ({type: "Class" as const, id}))
            ]
            :[{type: 'Class', id: "LIST"}]
        }),
        getClassOptions: builder.query< EntityState<ClassOptions>, void>({
            query: () => 'classes',
            transformResponse:(response: ClassOptions[]) => {
                return classOptionsAdapter.addMany(classOptionsAdapter.getInitialState(), response)
            },
        }),
        addClass: builder.mutation({
            query:initialState => ({
                url:"classes",
                method: 'POST',
                body: {
                    ...initialState
                }
            }),
            invalidatesTags: [
                {type: 'Class', id: "LIST"},
                { type: "Department", id: "LIST" }
            ]
        })
        ,
        updateClass: builder.mutation({
            query:initialState => ({
                url:`classes/${initialState.id}`,
                method: 'PUT',
                body: {
                    ...initialState
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Class', id: arg.id}
            ]
        }),
        deleteClass: builder.mutation<{ success: boolean; id: number },number>({
            query(id) {
              return {
                url: `classes/${id}`,
                method: "DELETE",
              };
            },
            invalidatesTags: (result, error, id) => [{ type: "Class", id }],
          }),
    })
})

export const {useGetClassesQuery, useGetClassOptionsQuery, useAddClassMutation, useUpdateClassMutation, useDeleteClassMutation} = extendedApiSlice