"use client"

import Image from 'next/image';
import logo from './assets/studio137-logo.png'
import searchicon from './assets/search_icon.svg'
import plusicon from './assets/plus_icon.png'
import sortlogo from './assets/sort_logo.png'
// import sortlogo from './assets/up-down.png'
import filtericon from './assets/filtericon.png'
import { useWindowSize } from './Hooks/useWindow';
import SmallerTask from './components/SmallerTask';
import { Key, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Task from './components/Task';
import OverlayMenu from './components/OverlayMenu';
import {store} from './lib/store'
import { Provider } from 'react-redux';
import DeleteTodo from './components/DeleteTodo';
import ButtonComp from './components/ButtonComp';

const tasks = [
  {
    title:"EKL",
    desc:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna",
    dueDate:"12/10/24",
    status:"In Progress",
    priority:"Low"
  }
]

export default function Home() {
  
  const wind = useWindowSize();
  // console.log(wind.width);
  // console.log(wind.height);
  

  const [smaller, setSmaller] = useState<boolean> ((wind.width>768)?false:true)
  const [showSearchBar, setShowSearchBar] = useState<boolean> (false)
  const [showOverlayMenu, setShowOverlayMenu] = useState<boolean>(false)
  const [overlayTitle, setOverlayTitle] = useState<string>('')
  const [showDeleteMenu, setDeleteMenu] = useState<boolean> (false)
  const [idFromChild, setIdFromChild] = useState<Key> ()
  const [sortType, setSortType] = useState<Number>(1)
  const [filterType, setFilterType] = useState<string>('None')
  const [searchText, setSearchText] = useState<string>('')

  function handleDataFromChild({editTitle="",val}:{editTitle?:string,val:Key}){
    if(editTitle!=""){
      setOverlayTitle(editTitle)
    }
    setIdFromChild(val)
  }

  useEffect(() => {
    if(wind.width>768){
      if(smaller!=false){
        setSmaller(false)
        setShowSearchBar(false)
      }
    }else{
      if(smaller!=true){
        setSmaller(true)
      }
    }

  }, [wind.width])

  
  function handleAddTask(){
    setIdFromChild(undefined)
    setOverlayTitle('Add Task')
    setShowOverlayMenu(true)
  }

  function handleUpdateTask(){
    setOverlayTitle('Edit Task')
    setShowOverlayMenu(true)
  }

  const filterOptions = ['None','Low','Medium','High','In Progress','Completed']

  function toggleValue(currentValue:string) {
      const currentIndex = filterOptions.indexOf(currentValue);
      const nextIndex = (currentIndex + 1) % filterOptions.length;
      currentValue = filterOptions[nextIndex];
      return currentValue;
  }
    

  function handleFilter(){
    setFilterType(toggleValue(filterType))
  }


  return (
    <>
      <div className=" w-screen h-screen flex flex-col gap-2">
        <div className=" flex">
          {!showSearchBar &&
          <div>
            <Image
            src={logo}
            height={86}
            width={147}
            alt="Studio 137 logo"
            />
          </div>}
          <div className={` flex flex-1 flex-row justify-end items-center ${smaller==true?'':'pr-8'} `}>
            {!smaller && 
            <div className='flex gap-1 p-1 h-10 rounded-lg border-2 border-[#9B9B9B] items-center justify-start'>
              <Image
              src={searchicon}
              alt="SearchIcon"
              />
              <input 
              className=' flex items-center outline-none rounded-lg flex-1 pr-[6.5rem]'
              type="text" 
              value={searchText}
              onChange={(e)=>setSearchText(e.target.value)}
              placeholder='Search'/>
            </div>}
            {smaller && !showSearchBar &&
            <button 
            onClick={()=>setShowSearchBar(true)}
            className='bg-[#941B0F] rounded-md p-1 mr-4'>
              <Image
              src={searchicon}
              width={30}
              height={30}
              className=' fill-white'
              alt="Search Icon"
              />
            </button>
            }
            {showSearchBar &&
            <div className='flex flex-1 gap-1 p-1 h-10 rounded-lg border-2 border-[#9B9B9B] m-4'>
              <Image
              src={searchicon}
              alt="SearchIcon"
              />
              <input 
              className=' flex items-center outline-none rounded-lg flex-1'
              type="text"
              value={searchText}
              onChange={(e)=>setSearchText(e.target.value)} 
              placeholder='Search'/>
            </div>
            }
          </div>
        </div>
        <div className=" flex h-10 items-center">
          <div className=' text-xl pl-8 font-bold'>
            <p>Tasks</p>
          </div>
          <div className={`flex-1 flex justify-end items-center gap-4 ${smaller==true?'pr-4':'pr-8'} `}>
            <button 
            onClick={()=>handleAddTask()}
            className='flex justify-center bg-[#941B0F] h-10 items-center gap-2 p-4 text-white rounded-md '>
              <Image
              src={plusicon}
              alt="plusicon"
              width={16}
              height={16}
              />
              <p>Add Task</p>
            </button>
            <Provider store={store}>
              <ButtonComp smaller={smaller} logo={sortlogo} task={"Sort"} value={sortType} fn={setSortType} title={"Sort Logo"}/>
            </Provider>
            <Provider store={store}>
              <ButtonComp smaller={smaller} logo={filtericon} task={"Filter"} fn={handleFilter} title={"Filter Icon"}/>
            </Provider>
          </div>
        </div>
        <div className={` flex-1 border-2 border-[#941B0F] rounded-lg ${smaller==true?'mx-4':'mx-8'} my-6 overflow-y-scroll no-scrollbar`}>
          {smaller && 
          <Provider store={store}>
            <SmallerTask 
            fn={setShowOverlayMenu} 
            fn2={setDeleteMenu} 
            giveParentData={handleDataFromChild} 
            filterType={filterType}
            searchVal={searchText}/>
          </Provider>}
          {!smaller && 
          <Provider store={store}>
            <Task 
            fn={setShowOverlayMenu} 
            fn2={setDeleteMenu} 
            giveParentData={handleDataFromChild} 
            filterType={filterType}
            searchVal={searchText}
            />
          </Provider>}
        </div>
      </div>
      {showOverlayMenu && 
      <Provider store={store}>
        <OverlayMenu title={overlayTitle} fn={setShowOverlayMenu} elementId={idFromChild}/>
      </Provider>}
      {showDeleteMenu && 
      <Provider store={store}>
        <DeleteTodo fn={setDeleteMenu} elementId={idFromChild}/>
      </Provider>}
    </>
  );
}
