import React, {useEffect} from 'react'; // useEffect is a react hook use to start the loading as first process
import styled from 'styled-components';
import {connect} from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {loadTodos,removeTodoRequest,markTodoAsCompletedRequest,} from './thunks';
import {displayAlert} from './thunks';
// import './TodoList.css';
import {getTodos,getTodosLoading,getCompletedTodos,getIncompleteTodos,} from './selectors';
import { isLoading } from './reducers';

// PFC 
// const BigRedText = styled.div`
//     font-size:48px;
//     color:#FF0000;
// `;
const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

// todo = [] give default value for todo prop
const TodoList = ({completedTodos,incompleteTodos,onRemovePressed,onCompletedPressed,onDisplayAlertClicked,isLoading,startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    // empty array to avoid constant reloading

    const loadingMessage = <div>Loading todos...</div>;
    const content =(
        <ListWrapper>
        {/* <BigRedText>Styled Component</BigRedText> */}
        <NewTodoForm/>
        <h3>Incompleted</h3>
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
        </ListWrapper>
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