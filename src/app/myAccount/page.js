
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'



const MyAccount = () => {
  return (
    <div className='h-screen bg-black text-yellow-400'>
    <div className='flex flex-row justify-center align-middle'>
    <Tabs variant='soft-rounded' align='center' className='border-4 border-yellow-400 p-7 my-24 rounded-lg h-[500px]'>
  <TabList>
    <Tab _selected={{ color: 'black', bg: 'yellow.400' }}>LOGIN</Tab>
    <Tab _selected={{ color: 'black', bg: 'yellow.400' }}>REGISTER</Tab>
  </TabList>
  <TabPanels className='py-10 px-5'>
    <TabPanel className='flex flex-col gap-5'>
      <input type="email" placeholder='Email' className='p-2 border-2 border-yellow-400 bg-black text-yellow-400 rounded-lg ' />
      <input type="password" placeholder='Password' className='p-2 border-2 border-yellow-400 rounded-lg  bg-black' />
      <a className='text-right text-sm text-gray-200 cursor-pointer underline hover:text-yellow-400'>Forgot Password?</a>
      <a href="#_" className="relative items-center m-auto w-24 justify-center px-5 py-3 overflow-hidden font-bold rounded-full group">
    <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
    <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-yellow-500 opacity-100 group-hover:-translate-x-8"></span>
    <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Submit</span>
    <span className="absolute inset-0 border-2 border-white rounded-full"></span>
    </a>
    </TabPanel>
    <TabPanel className='flex flex-col gap-5'>
    <input type="text" placeholder='Username' className='p-2 border-2 border-yellow-400 rounded-lg  bg-black' />
    <input type="email" placeholder='User email' className='p-2 border-2 border-yellow-400 rounded-lg  bg-black' />
    <input type="password" placeholder='Password' className='p-2 border-2 border-yellow-400 rounded-lg  bg-black' />
    <input type="password" placeholder='Confirm Password' className='p-2 border-2 border-yellow-400 rounded-lg  bg-black' />
    <a href="#_" className="relative items-center m-auto w-24 justify-center px-5 py-3 overflow-hidden font-bold rounded-full group">
    <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
    <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-yellow-500 opacity-100 group-hover:-translate-x-8"></span>
    <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Submit</span>
    <span className="absolute inset-0 border-2 border-white rounded-full"></span>
    </a>
    </TabPanel>
  </TabPanels>
</Tabs>
</div>
</div>
  )
  }
  
export default MyAccount