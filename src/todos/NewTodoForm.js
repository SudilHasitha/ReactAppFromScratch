import React,{useState} from 'react';
import {connect} from 'react-redux'; //higher oder function calls connect()(ComponentNeedToConnect)
import { addTodoRequest} from './thunks';
import './NewTodoForm.css';
import {getTodos} from './selectors';

const NewTodoForm = ({todos,onCreatePressed}) => {
    const [inputValue,setInputValue] = useState('');
    return(
        <div className = "new-todo-form">
            <input className="new-todo-input" type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Type the new todo" />
            <button 
            onClick={() =>{
                const isDuplicateText = todos.some(todo =>todo.text === inputValue)
                if(!isDuplicateText){
                    onCreatePressed(inputValue);
                    setInputValue('');
                }
            }}
            className="new-todo-button">Create Todo</button>
        </div>
    );
};

const mapStateToProps = state => ({
    todos: getTodos(state),
});
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});


export default connect(mapStateToProps,mapDispatchToProps)(NewTodoForm);