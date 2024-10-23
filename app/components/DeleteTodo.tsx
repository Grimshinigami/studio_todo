import React from 'react'
import crossicon from '../assets/crossicon.svg'
import Image from 'next/image'
import { Key } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, TodosT } from '../lib/features/todos/todoSlice'

function DeleteTodo({fn,elementId}:
    {fn:React.Dispatch<React.SetStateAction<boolean>>,elementId?:Key}) {


    const tasks = useSelector((state:TodosT)=> state.todos)
    const dispatch = useDispatch();

    console.log(tasks);

    function handleDelete(){
        console.log(elementId);
        if(elementId!=undefined){
            dispatch(deleteTodo({id:elementId}))
        }
        fn(false)
    }
    

  return (
    <div className=' w-screen h-screen absolute z-10 bg-black/50 border-2 border-black -top-0 flex justify-center items-center'>
        <div className={`w-[95%] md:w-[30%] bg-white rounded-md flex flex-col p-2 z-20 pt-2 gap-10 relative -top-32`}>
            <div className=' w-full h-8 flex items-center '>
                <p className=' pl-2 text-black text-xl font-semibold pt-8'>
                    Are you sure that you wish to delete this task?
                </p>
                <div className=' w-1/4 flex justify-end pr-2'>
                    <button onClick={()=>fn(false)}>
                    <Image
                    src={crossicon}
                    className=''
                    alt='CrossIcon'
                    width={25}
                    height={25}
                    />
                    </button>
                </div>
            </div>
            <div className=' w-full flex flex-row p-2 gap-2'>
                <button 
                onClick={()=>fn(false)}
                className='w-1/2 border-2 border-[#941B0F] text-[#941B0F] font-semibold rounded-md p-2'>
                    Cancel
                </button>
                <button 
                onClick={()=>handleDelete()}
                className=' w-1/2 bg-[#941B0F] border-2 border-[#941B0F] text-white font-semibold rounded-md p-2'>
                    Delete
                </button>
        </div>
        </div>
    </div>
  )
}

export default DeleteTodo