import { StaticImageData } from "next/image"
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { sortTodo } from "../lib/features/todos/todoSlice";

function ButtonComp({smaller,logo,task,fn,value,title}:
    {smaller:boolean,logo:StaticImageData,task:string,fn:any,value?:Number|string,title:string}) {

    const dispatch = useDispatch();

    function handleClick(task:string){
        if(task=="Sort"){
            dispatch(sortTodo({sortType:value}))
            fn((val:Number)=>-(val))
        } else {
            fn()
        }
        
    }

  return (
    <button
        onClick={()=>handleClick(task)}
        className='h-10 p-4 gap-2 font-semibold text-[#941B0F] flex justify-center items-center border-2 border-[#941B0F] rounded-md'
        >
        <Image
        src={logo}
        width={smaller==true?15:12}
        height={smaller==true?15:12}
        alt={title}
        />
        {!smaller && <p>{task}</p>}
    </button>
  )
}

export default ButtonComp