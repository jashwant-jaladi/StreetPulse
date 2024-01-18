import React from 'react'

const Pagination = ({length}) => {
    let pages=[]
    for(let i=1;i< Math.ceil(length/3);i++)
    {
        pages.push(i)   
    }
    return (
        <div>
            <center className='flex flex-row justify-center content-center p-20 text-lg gap-4 '>
            <div className=' hover:text-white border-2 border-yellow-600 p-3 rounded-lg cursor-pointer'>previous</div>
            {pages.map((item) =>
            (
                <button className="bg-black text-yellow-600  hover:text-white border-2 border-yellow-600 p-3 flex flex-row justify-center content-center rounded-lg">{item} &nbsp; </button>
            )
            )}
            <div className=' hover:text-white border-2 border-yellow-600 p-3 rounded-lg cursor-pointer'>next</div>
            </center>
        </div>
    )
}
   
export default Pagination