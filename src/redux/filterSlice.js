import { createSlice, nanoid } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: '',
    reducers: {
        addTask: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(text) {
                return {
                payload: {
                    text,
                    id: nanoid(),
                    completed: false,
                },
                };
            },
        },
    },
});

export const { addTask } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;