import Image from "next/image"
import menudown from '../assets/menu_down.svg'
import { useState } from "react";
import editicon from '../assets/edit_icon.png'
import deleteicon from '../assets/delete_icon.png'
import { Key } from "react";
import { useDispatch,useSelector } from "react-redux";
import { TodosT,TaskT } from "../lib/features/todos/todoSlice";
import { updatePriority } from "../lib/features/todos/todoSlice";
import { nanoid } from "@reduxjs/toolkit";

function SmallerTask({fn,fn2,giveParentData,filterType,searchVal}:
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

        const [showRest, setShowRest] = useState<Key>()

        function handleShowRest(id:Key){
            if(showRest==id){
                setShowRest('')
            } else {
                setShowRest(id)
            }
        }
      
        let counter = 0;
  return (
    <div className="h-full ">
        {tasks.length==0 &&
        <div className=' w-full flex justify-center p-10'>
            <p>No tasks Found</p>
        </div>
        }
        {tasks.map((task)=>(
        <div className={` ${showRest!=task.id?'h-[82px]':'flex flex-col'} ${counter%2!=0?'bg-[#FFF9F8]':''} gap-4 p-4 `} key={task.id}>
            <div className=" w-full flex items-center">
                <div className="w-1/3 text-left text-[#941B0F]">
                    <p>SL.No</p>
                </div>
                <div className="w-2/3 text-left flex flex-row justify-end items-start">
                    <p className=" flex-1">{++counter}</p>
                    <button 
                    onClick={()=>handleShowRest(task.id)}
                    className={` relative top-1 ${showRest==task.id?'rotate-180':''}`}>
                        <Image
                        src={menudown}
                        alt="menudownicon"
                        width={16}
                        height={16}
                        />
                    </button>
                </div>
            </div>
            <div className=" w-full flex items-center">
                <div className="w-1/3 text-left text-[#941B0F]">
                    <p>Title</p>
                </div>
                <div className="w-2/3 text-left flex flex-row justify-end items-start">
                    <p className=" flex-1 break-words overflow-y-scroll no-scrollbar">{task.title}</p>
                </div>
            </div>
            {showRest==task.id && <><div className=" w-full flex justify-start">
                <div className="w-1/3 text-left text-[#941B0F] flex">
                    <p>Description</p>
                </div>
                <div className="w-2/3 text-left flex flex-row justify-end items-start">
                    <p className=" flex-1 flex flex-wrap break-words overflow-y-scroll no-scrollbar">{task.desc}</p>
                </div>
            </div>
            <div className=" w-full flex items-cente justify-start">
                <div className="w-1/3 text-left text-[#941B0F] flex">
                    <p>Due Date</p>
                </div>
                <div className="w-2/3 text-left flex flex-row justify-end items-start">
                    <p className=" flex-1">{task.dueDate}</p>
                </div>
            </div>
            <div className=" w-full flex items-cente justify-start">
                <div className="w-1/3 text-left text-[#941B0F] flex">
                    <p>Status</p>
                </div>
                <div className="w-2/3 text-left flex flex-row justify-end items-start">
                    <div className=" flex-1 text-white text-sm justify-start flex ">
                        <p className={`${task.status.toLowerCase()==='Completed'.toLowerCase()?'bg-[#03A229]':'bg-[#F5D20E]'} px-4 py-1 rounded-2xl`}>
                            {task.status}
                        </p>
                    </div>
                </div>
            </div>
            <div className=" w-full flex items-center">
                <div className="w-1/3 text-left text-[#941B0F]">
                    <p>Priority</p>
                </div>
                <div className="w-2/3 text-left flex flex-row justify-start items-center">
                    <select 
                    value={task.priority} 
                    className={`border-2 border-black outline-none rounded-lg px-3 ${counter%2==0?'bg-[#FFF9F8]':''}`}
                    onChange={(e)=> handlePriorityChange(task.id,e.target.value)}
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
                    <div className=" flex-1 h-full flex justify-end items-center gap-2">
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
            </div></>}
        </div>))}
    </div>
  )
}

export default SmallerTask