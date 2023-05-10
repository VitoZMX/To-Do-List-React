import React from 'react'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType> // или TaskType[]
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
                <li>
                    <input type="checkbox" checked={props.tasks[0].isDone}/>
                    <span>{props.tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].isDone}/>
                    <span>{props.tasks[1].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].isDone}/>
                    <span>{props.tasks[2].title}</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}