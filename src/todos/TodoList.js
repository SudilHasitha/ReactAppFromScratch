import React, {useEffect} from 'react'; // useEffect is a react hook use to start the loading as first process
import {connect} from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {markTodoAsCompleted} from './actions';
import {loadTodos,removeTodoRequest} from './thunks';
import {displayAlert} from './thunks';
import './TodoList.css';
import { isLoading } from './reducers';

// todo = [] give default value for todo prop
const TodoList = ({todos = [],onRemovePressed,onCompletedPressed,onDisplayAlertClicked,isLoading,startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    // empty array to avoid constant reloading

    const loadingMessage = <div>Loading todos...</div>;
    const content =(
        <div className="list-wrapper">
        <NewTodoForm/>
        {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed}/> )}
        </div>
    );
    return isLoading ? loadingMessage : content;
};
const mapStateToProps = state => ({
    isLoading: state.isLoading,
    todos: state.todos,
});
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
    onDisplayAlertClicked: text => dispatch(displayAlert(text)),
});
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);