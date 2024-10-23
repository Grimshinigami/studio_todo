import Image from 'next/image'
import crossicon from '../assets/crossicon.svg'
import calendaricon from '../assets/calendaricon.svg'
import { Key, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { useWindowSize } from '../Hooks/useWindow'
import { useDispatch } from 'react-redux'
import { addTodo,updateTodo } from '../lib/features/todos/todoSlice'
import { useSelector } from 'react-redux'

function OverlayMenu({title,status,fn,elementId}:
  {title:string,status?:string,fn:React.Dispatch<React.SetStateAction<boolean>>,elementId?:Key}) {

  const wind = useWindowSize();

  const dispatch = useDispatch();

  const [titleval, setTitleVal] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [showCal, setShowCal] = useState<boolean>(false)
  const [statusSelected, setStatusSelected] = useState<string>(statusVal())

  const tasks = useSelector((state:any) => state.todos)

  // console.log(tasks);

  useEffect(() => {
    if(elementId!=undefined){
      for(let i =0;i<tasks.length;++i){
        if(tasks[i].id==elementId){
          setTitleVal(tasks[i].title)
          setDesc(tasks[i].desc)
          setDueDate(tasks[i].dueDate)
          setStatusSelected(tasks[i].status)
          break;
        }
        
      }
    } 
  }, [elementId])
  

  function statusVal(){
    if(status==undefined){
      return 'In Progress'
    }
    return status
  }

  const statusOptions = ['In Progress','Completed']

  

  function handledateclick(value:Date){
      setDueDate(value.toLocaleDateString())
      setShowCal(false)
  }

  function taskDoer(){
    if(elementId==undefined){
      dispatch(addTodo({
        title:titleval,
        desc,
        dueDate,
        status:statusSelected
      }))
    }
    else {
      dispatch(updateTodo({
        id:elementId,
        title:titleval,
        desc,
        dueDate,
        status:statusSelected
      }))
    }
    fn(false)
  }
  

  return (
    <div className=' w-screen h-screen absolute z-10 bg-black/50 border-2 border-black -top-0 flex justify-center items-center'>
      <div className={`w-[95%] md:w-[40%] bg-white rounded-md flex flex-col p-2 z-20 pt-2`}>
        <div className=' w-full h-8 flex items-center py-8'>
          <p className=' pl-2 text-black text-xl font-semibold '>{title}</p>
          <div className=' flex-1 flex justify-end pr-2'>
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
        <div className=' w-full flex flex-col p-2 gap-2'>
          <p>Title</p>
          <input 
          type="text" 
          placeholder='Title' 
          className=' outline-none border-2 border-[#707070] rounded-md p-2'
          value={titleval}
          onChange={(e)=> setTitleVal(e.target.value)}
          />
        </div>
        <div className=' w-full flex flex-col p-2 gap-2'>
          <p>Description</p>
          <textarea 
          placeholder='Description' 
          rows={6}
          className=' outline-none border-2 border-[#707070] rounded-md p-2 resize-none'
          value={desc}
          onChange={(e)=> setDesc(e.target.value)}
          >

          </textarea>
        </div>
        <div className=' w-full flex flex-col p-2 gap-2'>
          <p>Choose Due Date</p>
          <div className='border-2 border-[#707070] rounded-md p-2 flex'>
            <input
            placeholder={new Date(Date.now()).toLocaleDateString()}
            className=' outline-none flex-1'
            value={dueDate}
            readOnly={true}
            />
            <button onClick={()=> setShowCal((val)=>!val)} >
              <Image
              src={calendaricon}
              alt='Calendar Icon'
              height={25}
              width={25}
              />
            </button>
            {showCal && 
                <Calendar 
                tileClassName={" hover:bg-blue-600 w-10 h-10 "}
                className={"bg-white flex flex-col justify-center z-30 items-center w-[72%] md:w-[30%] gap-2 space-x-2 border-2 border-black absolute top-60 left-[20%] md:left-[38.2%]"}
                onClickDay={(value)=> handledateclick(value)}
                />
              }
          </div>
        </div>
        <div className=' w-full flex flex-col p-2 gap-2'>
          <p>Status</p>
          <select 
          className=' outline-none border-2 border-[#707070] rounded-md p-2'
          value={statusSelected}
          onChange={(e)=>setStatusSelected(e.target.value)}
          >
            {statusOptions.map((status)=>(
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className=' w-full flex flex-row p-2 gap-2'>
          <button 
          onClick={()=>fn(false)}
          className='w-1/2 border-2 border-[#941B0F] text-[#941B0F] font-semibold rounded-md p-2'>
            Cancel
          </button>
          <button 
          onClick={()=>taskDoer()}
          className=' w-1/2 bg-[#941B0F] border-2 border-[#941B0F] text-white font-semibold rounded-md p-2'>
            {title}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OverlayMenu