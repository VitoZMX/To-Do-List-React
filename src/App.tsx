import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm'

export type FilterValuesType = 'all' | 'completed' | 'active'

type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title || 'Default Name Task', isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(p => p.id === taskId)

        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }

    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(p => p.id === taskId)

        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoList([...todolists])
        }
    }

    function removeTask(taskId: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(el => el.id !== taskId)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
        }
        setTodoList([...todolists])
    }

    function removeToDoList(todolistId: string) {
        let filteredTodolist = todolists.filter(el => el.id !== todolistId)
        setTodoList(filteredTodolist)

        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodoList] = useState<Array<ToDoListType>>([
        {id: todolistId1, title: 'Text', filter: 'active'},
        {id: todolistId2, title: 'text2', filter: 'completed'}
    ])

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [{id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true}],
        [todolistId2]: [{id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Meet', isDone: true}],
    })

    function addTodolist(title: string) {
        let todolist: ToDoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoList([todolist, ...todolists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map((tl) => {
                        let tasksForToDoList = tasksObj[tl.id]

                        if (tl.filter === 'completed') {
                            tasksForToDoList = tasksForToDoList.filter(el => el.isDone === true)
                        }
                        if (tl.filter === 'active') {
                            tasksForToDoList = tasksForToDoList.filter(el => el.isDone === false)
                        }

                        return (
                            <Todolist
                                key={tl.id}
                                title={tl.title}
                                id={tl.id}
                                tasks={tasksForToDoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                filter={tl.filter}
                                changeTodolistTitle={changeTodolistTitle}
                                removeToDoList={removeToDoList}/>
                        )
                    }
                )
            }
        </div>
    )
}

export default App