import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";
import { act, Key } from "react";

export interface TaskT {
    id:Key,
    title:String,
    desc:String,
    dueDate:String,
    status:String,
    priority:string,
}

export interface TodosT {
    todos:TaskT[]
}

const todos:TaskT[] = []

const initialState = {
    todos
}

export const todoSlice = createSlice({
    name:"Todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo = {
                id:nanoid(),
                title:action.payload.title,
                desc:action.payload.desc,
                dueDate:action.payload.dueDate,
                status:action.payload.status,
                priority:"Low",
            }
            state.todos.push(todo)
            state.todos.sort((a,b)=>(a.dueDate<b.dueDate)?-1:1)
        },
        deleteTodo: (state,action) => {
            state.todos = state.todos.filter((todo)=>(todo.id!==action.payload.id))
            state.todos.sort((a,b)=>(a.dueDate<b.dueDate)?-1:1)
        },
        updateTodo: (state,action) => {
            state.todos.map((todo)=>{
                if(todo.id==action.payload.id){
                    todo.title = action.payload.title
                    todo.desc = action.payload.desc
                    todo.dueDate = action.payload.dueDate
                    todo.status = action.payload.status
                }
                return todo
            })
            state.todos.sort((a,b)=>(a.dueDate<b.dueDate)?-1:1)
        },
        updatePriority: (state,action) => {
            state.todos.map((todo)=>{
                if(todo.id==action.payload.id){
                    todo.priority = action.payload.priority
                }
                return todo
            })
        },
        sortTodo: (state,action)=> {
            state.todos = state.todos.sort((a,b)=>(a.dueDate<b.dueDate)?action.payload.sortType:-(action.payload.sortType))
        }
    }
})

export const {addTodo,deleteTodo,updateTodo,updatePriority,sortTodo} = todoSlice.actions

export default todoSlice.reducer