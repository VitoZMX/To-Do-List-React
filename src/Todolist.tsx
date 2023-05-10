import React from 'react'
import {FilterValuesType} from './App'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType> // или TaskType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: ToDoListPropsType) {

    return (
        <div style={{background: '#bfcfff', borderRadius: '8px', padding: '8px'}}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>Add</button>
            </div>
            <ul>
                {
                    props.tasks.map((el) => {
                        return (
                            <li>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={() => {
                                    props.removeTask(el.id)
                                }}>Delete
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}