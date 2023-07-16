import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";
import { Agriculture, ResetTvOutlined } from "@mui/icons-material";
import { arEG } from "@mui/material/locale";
import { Classes } from "../../models/classes.model";


const classAdapter = createEntityAdapter()

const initialState = classAdapter.getInitialState({
    name: "",
    departmentName: ""
})

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClasses: builder.query< Classes[], void>({
            query: () => 'classes',
            providesTags: (result) => 
            result
            ?[
                {type: 'Class', id: "LIST"},
                ...result.map(({id}) => ({type: "Class" as const, id}))
            ]
            :[{type: 'Class', id: "LIST"}]
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
                {type: 'Class', id: "LIST"}
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
        })
    })
})

export const {useGetClassesQuery, useAddClassMutation, useUpdateClassMutation} = extendedApiSlice