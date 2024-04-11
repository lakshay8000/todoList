import { createSlice } from '@reduxjs/toolkit';
import { filterTodosByStatus } from '../utils/todoUtils';


const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    All : [],
    Pending : [],
    Finished : [],
    category : "All"
  },
  reducers: {
    addTodo: (state, action) => {
      state.All.push(action.payload);

      state.Pending= filterTodosByStatus(state.All, "Pending");
      state.Finished= filterTodosByStatus(state.All, "Finished");

      return state;
    },

    editTodo: (state, action) => {
      const payload = action.payload;

      state.All = state.All.map((todo) => {
        if (todo.id === payload.id) {
          return payload;
        }
        return todo;
      });

      state.Pending= filterTodosByStatus(state.All, "Pending");
      state.Finished= filterTodosByStatus(state.All, "Finished");

      return state;   //  While immer works with some operations like push, pop etc but returning the updated state assures that redux toolkit knows about the changes made to the state.
    },

    removeTodo: (state, action) => {
      state.All = state.All.filter(todo => todo.id != action.payload.id);

      state.Pending= filterTodosByStatus(state.All, "Pending");
      state.Finished= filterTodosByStatus(state.All, "Finished");

      return state;
    },

    updateStatus : (state, action) => {
      state.All= state.All.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, status : action.payload.statusToUpdate }
        }
        return todo;
      });

      state.Pending= filterTodosByStatus(state.All, "Pending");
      state.Finished= filterTodosByStatus(state.All, "Finished");

      return state;
    },

    changeCategory : (state, action) => {
      state.category= action.payload;
      return state;
    }

  },
})

// Action creators are generated for each case reducer function
export const { addTodo, editTodo, removeTodo, updateStatus, changeCategory } = todosSlice.actions;

export default todosSlice.reducer;