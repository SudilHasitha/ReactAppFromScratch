import {loadTodosInProgress,loadTodosInFailure,loadTodosInSuccess} from './actions'

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

}

export const displayAlert = text => () => {
    alert(text);
};