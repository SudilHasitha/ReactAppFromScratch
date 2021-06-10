import React, {useEffect} from 'react'; // useEffect is a react hook use to start the loading as first process
import {connect} from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {loadTodos,removeTodoRequest,markTodoAsCompletedRequest,} from './thunks';
import {displayAlert} from './thunks';
import './TodoList.css';
import {getTodos,getTodosLoading,getCompletedTodos,getIncompleteTodos,} from './selectors';
import { isLoading } from './reducers';

// todo = [] give default value for todo prop
const TodoList = ({completedTodos,incompleteTodos,onRemovePressed,onCompletedPressed,onDisplayAlertClicked,isLoading,startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    // empty array to avoid constant reloading

    const loadingMessage = <div>Loading todos...</div>;
    const content =(
        <div className="list-wrapper">
        <NewTodoForm/>
        <h3>incompleted</h3>
        {incompleteTodos.map(todo => 
            <TodoListItem 
            todo={todo} 
            onRemovePressed={onRemovePressed} 
            onCompletedPressed={onCompletedPressed}/> )}
        <h3>Completed</h3>
        {completedTodos.map(todo => 
            <TodoListItem 
            todo={todo} 
            onRemovePressed={onRemovePressed} 
            onCompletedPressed={onCompletedPressed}/> )}
        </div>
    );
    return isLoading ? loadingMessage : content;
};
const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
});
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    onDisplayAlertClicked: text => dispatch(displayAlert(text)),
});
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);