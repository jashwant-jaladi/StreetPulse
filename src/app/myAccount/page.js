
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
      <input type="submit" className='p-3 border-2 border-yellow-400 rounded-lg w-20 m-auto ' />
    </TabPanel>
    <TabPanel className='flex flex-col gap-5'>
    <input type="text" placeholder='Username' className='p-2 border-2 border-yellow-400 rounded-lg  bg-black' />
    <input type="email" placeholder='User email' className='p-2 border-2 border-yellow-400 rounded-lg  bg-black' />
    <input type="password" placeholder='Password' className='p-2 border-2 border-yellow-400 rounded-lg  bg-black' />
    <input type="password" placeholder='Confirm Password' className='p-2 border-2 border-yellow-400 rounded-lg  bg-black' />
    <input type="submit" className='p-3 border-2 border-yellow-400 rounded-lg w-20 m-auto' />
    </TabPanel>
  </TabPanels>
</Tabs>
</div>
</div>
  )
  }
  
export default MyAccount