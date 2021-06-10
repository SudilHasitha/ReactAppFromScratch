import React from 'react';
// import './TodoListItem.css'
import styled from 'styled-components';

const TodoItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

// inherit the style components
const TodoItemContainerWithWarning = styled(TodoItemContainer)`
    border-bottom:${ props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 *5 ) 
        ? '3px solid green' 
        : '3px solid red')};
`;

const ButtonContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const ButtonStyle = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
`;


const CompletedButton = styled(ButtonStyle)`
    background-color: #22ee22;
`;

const RemoveButton = styled(ButtonStyle)`
    background-color: #ee2222;
    margin-left: 8px;
`;

const TodoListItem = ({todo,onRemovePressed,onCompletedPressed}) => {
    const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;
    return(
    <Container createdAt={todo.createdAt}>
        <h3>{todo.text}</h3>
        <p>
            Created at:&nbsp;
            {(new Date(todo.createdAt)).toLocaleDateString()}
        </p>
        <ButtonContainer>
            {todo.isCompleted ? null : <CompletedButton 
                                        onClick ={() => onCompletedPressed(todo.id)}
                                        className="completed-button">Mark as completed</CompletedButton>}
            <RemoveButton 
                onClick={()=>onRemovePressed(todo.id)} 
                className="remove-button">Remove
            </RemoveButton>
        </ButtonContainer>
    </Container>
    );
}

export default TodoListItem;