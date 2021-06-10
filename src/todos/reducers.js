import {CREATE_TODO, REMOVE_TODO,MARK_TODO_AS_COMPLETED,LOAD_TODOS_IN_FAILURE,LOAD_TODOS_IN_PROGRESS,LOAD_TODOS_IN_SUCCESS} from './actions';

// add reducer to keep track of loading the todos
export const isLoading = (state = false, action) => {
    const {type} = action;
    switch(type){
        case LOAD_TODOS_IN_PROGRESS:
            return true;
        case LOAD_TODOS_IN_SUCCESS:
            return true;
        case LOAD_TODOS_IN_FAILURE:
            return false;
        default:
            return state;
    }
}


// get current state and action to decide what to change in the state
export const todos = (state = [], action) => {
    const {type, payload} = action;

    switch(type){
        case CREATE_TODO:{
            const {text} = payload;
            const newTodo = {
                text,
                isCompleted:false,
            };
            return state.concat(newTodo);
        }
        case REMOVE_TODO:{
            const {text} =payload;
            return state.filter(todo => todo.text != text);
        }
        case MARK_TODO_AS_COMPLETED:{
            const {text} = payload;
            return state.map(todo=>{
                if (todo.text === text){
                    return {...todo,isCompleted:true}; //... - spread operator
                }
                return todo;
            });
        }
        default:
            return state;
    }
}