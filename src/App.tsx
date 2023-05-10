import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, delTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: false},
        {id: 3, title: 'JS', isDone: true},
        {id: 4, title: 'React', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(taskId: number) {
        let filteredTasks = tasks.filter(el => el.id !== taskId)
        delTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForToDoList = tasks
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(el => el.isDone === true)
    }
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(el => el.isDone === false)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    )
}

export default App