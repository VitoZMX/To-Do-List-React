import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function addTask(title: string) {
        let newTask = {id: v1(), title: title || 'Default Name Task', isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function removeTask(taskId: string) {
        let filteredTasks = tasks.filter(el => el.id !== taskId)
        setTasks(filteredTasks)
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
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    )
}

export default App