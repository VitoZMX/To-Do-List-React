import React from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'

function App() {

    let tasks1: Array<TaskType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: false},
        {id: 3, title: 'JS', isDone: true}
    ]
    let tasks2: Array<TaskType> = [
        {id: 1, title: 'Film1', isDone: true},
        {id: 2, title: 'Film2', isDone: false},
        {id: 3, title: 'Film3', isDone: false}
    ]
    let tasks3: Array<TaskType> = [
        {id: 1, title: '123', isDone: true},
        {id: 2, title: '123', isDone: false},
        {id: 3, title: '123', isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks1}/>
            <Todolist title={'Movies'} tasks={tasks2}/>
            <Todolist title={'Plans to weekend'} tasks={tasks3}/>
        </div>
    )
}

export default App