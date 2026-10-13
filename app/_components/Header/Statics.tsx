import React from 'react'
import {UsersRound} from 'lucide-react'
const Statics = () => {
  return (
    <div className='w-full shadow-2xl h-auto p-4'>
        <div className='flex justify-evenly'>
            <div className='flex-1 flex gap-2'>
                <UsersRound className='text-primary'/>
                <span className='font-semibold'>کاربران فعال</span>
            </div>
            <span className='flex-1 text-left text-primary font-semibold'>۳۲۰ هزار نفر</span>
        </div>
    </div>
  )
}

export default Statics
