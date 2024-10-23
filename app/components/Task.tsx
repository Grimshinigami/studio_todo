import editicon from '../assets/edit_icon.png'
import deleteicon from '../assets/delete_icon.png'
import Image from 'next/image';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo,deleteTodo,updatePriority, TodosT } from '../lib/features/todos/todoSlice';
import { TaskT } from '../lib/features/todos/todoSlice';
import { useState } from 'react';
import { Key } from 'react';

function Task({fn,fn2,giveParentData,filterType,searchVal}:
  {fn:React.Dispatch<React.SetStateAction<boolean>>,
   fn2:React.Dispatch<React.SetStateAction<boolean>>,
   giveParentData:any,
   filterType:string
   searchVal:string
  }) {

  const dispatch = useDispatch();

  const priorityOptions = ['Low','Medium','High']

  let tasks = useSelector((state:TodosT) => state.todos)
  
  // console.log(filterType);

  if(filterType!="None"){
    if(filterType=='Low' || filterType=='Medium' || filterType=='High'){
      tasks = tasks.filter((task)=>(task.priority==filterType))
    } else {
      tasks = tasks.filter((task)=>(task.status==filterType))
    }
  }
  
  if(searchVal!=''){
    tasks = tasks.filter((task)=> task.title.toLowerCase().startsWith(searchVal.toLowerCase()))
  }

  function handlePriorityChange(id:Key,val:string){
    dispatch(updatePriority({id:id,priority:val}))
  }

  function handleEdit(id:Key){
    giveParentData({editTitle:"Edit Task",val:id})
    fn(true)
  }

  function handleDelete(id:Key){
    giveParentData({editTitle:"",val:id})
    fn2(true)
  }

  let counter = 0;

  return (
    <div className=" w-full flex flex-col ">
      {tasks.length!=0 && 
      <div className="w-full flex flex-row p-6 bg-[#FFF9F8] rounded-t-md border-b-2 border-[#941B0F] text-[#941B0F]">
        <p className=" w-[12.5%] ">SL.No</p>
        <p className=" w-[12.5%] ">Title</p>
        <p className=" w-[35%] ">Description</p>
        <p className=" w-[10%] ">Due Date</p>
        <p className=" w-[10%] ">Status</p>
        <p className=" w-[10%] ">Priority</p>
      </div>}
      {tasks.length==0 &&
      <div className=' w-full flex justify-center p-10'>
        <p>No tasks Found</p>
      </div>
      }
      {tasks.map((task:TaskT)=>(
        <div className={`w-full flex flex-row justify-start p-6 font-medium ${counter%2!=0?'bg-[#FFF9F8]':''}`} key={task.id}>
        <p className=" w-[12.5%] text-xs md:text-sm lg:text-base">{++counter}</p>
        <p className=" w-[12.5%] text-xs md:text-sm lg:text-base">{task.title}</p>
        <p className=" w-[35%] text-xs md:text-sm lg:text-base">{task.desc}</p>
        <p className=" w-[10%] text-xs md:text-sm lg:text-base overflow-auto">{task.dueDate}</p>
        <div className=" w-[11%] text-xs md:text-sm lg:text-base overflow-auto flex items-start">
          <p className={`xl:w-3/4 ${task.status.toLowerCase()==='Completed'.toLowerCase()?'bg-[#03A229]':'bg-[#F5D20E]'} px-4 py-1 rounded-2xl text-white`}>
            {task.status}
          </p>
        </div>
        <div 
        className=" w-[10%] flex flex-wrap overflow-auto text-xs md:text-sm lg:text-base rounded-md items-start justify-start"
        >
          <select
          id="SelectField"
          value={task.priority}
          onChange={(e)=> handlePriorityChange(task.id,e.target.value)}
          className={` border-2 border-black md:px-2 md:py-1 rounded-md text-center ${counter%2!=0?'':'bg-[#FFF9F8]'}`}
          >
            {priorityOptions.map((prior)=>(
              <option
              key={nanoid()}
              className=' border-2 border-green-200'
              value={prior}>
                {prior}
              </option>
            ))}
          </select>
        </div>
        <div className=' flex-1 flex gap-3 justify-center items-start'>
          <button onClick={()=>handleEdit(task.id)}>
              <Image
              src={editicon}
              alt="EditIcon"
              width={20}
              height={20}
              />
          </button>
          <button onClick={()=>handleDelete(task.id)}>
              <Image
              src={deleteicon}
              alt="DeleteIcon"
              width={20}
              height={20}
              />
          </button>
        </div>
      </div>
      ))}
      
    </div>
  )
}

export default Task