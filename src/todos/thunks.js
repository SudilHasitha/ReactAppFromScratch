import {createTodo,removeTodo,loadTodosInProgress,loadTodosInFailure,loadTodosInSuccess,markTodoAsCompleted} from './actions';

// dispatch - use to dispatch other redux actions 
// getstate - get access to the current state of the redux store
export const loadTodos = () => async(dispatch, getState) =>{
    try {
        dispatch(loadTodosInProgress());
        // request to the server
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();

        dispatch(loadTodosInSuccess(todos));
    } catch (error) {
        dispatch(loadTodosInFailure())
        dispatch(displayAlert(error))
    }
};

export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({text});
        const response = await fetch('http://localhost:8080/todos',{
            headers:{
                'Content-Type':'application/json',
            },
            method:'POST',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (error) {
        dispatch(displayAlert(error))
    }
    
};

export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`,{
            method:'delete'
        });
        const removeTodoact = await response.json();
        dispatch(removeTodo(removeTodoact));
    } catch (error) {
        dispatch(displayAlert(error))
    }
};

export const markTodoAsCompletedRequest = id => async dispatch =>{
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`,{
            method:'post'
        });
        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    } catch (error) {
        dispatch(displayAlert(error))
    }
}

export const displayAlert = text => () => {
    alert(text);
};