import { todos } from "./reducers";

export const CREATE_TODO = 'CREATE_TODO';

// there are action creaters
export const createTodo = text => ({
    type: CREATE_TODO,
    payload: {text},
});

export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = text => ({
    type: REMOVE_TODO,
    payload: {text},
});

export const MARK_TODO_AS_COMPLETED = 'MARK_TODO_AS_COMPLETED';
export const markTodoAsCompleted = text =>({
    type:MARK_TODO_AS_COMPLETED,
    payload: {text},
});

export const LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS';
export const loadTodosInProgress = () => ({
    type: LOAD_TODOS_IN_PROGRESS,
});

export const LOAD_TODOS_IN_SUCCESS = 'LOAD_TODOS_IN_SUCCESS';
export const loadTodosInSuccess = todos => ({
    type: LOAD_TODOS_IN_SUCCESS,
    payload: {todos},
});

export const LOAD_TODOS_IN_FAILURE = 'LOAD_TODOS_IN_FAILURE';
export const loadTodosInFailure = () => ({
    type: LOAD_TODOS_IN_FAILURE,
});