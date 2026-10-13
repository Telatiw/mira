import Statics from '@/app/_components/Header/Statics'
import React from 'react'

const Header = () => {
    return (
        <div className='w-10/12 flex flex-col'>
            <div className='mt-5 flex flex-col'>
                <h2 className='font-extrabold text-center text-4xl '>محصولات لباس
                    <span className='text-primary relative'> میرا
                        <svg className='absolute -bottom-2 right-0 w-full h-3 text-yellow-400'>
                            <use href='#waveLine'></use>
                        </svg>
                    </span>
                </h2>
                <p className='mt-16'>با دسترسی به بزرگ‌ترین مجموعه‌ی فروشگاه های طبقه‌بندی شده، مسیر زیبایی خود را هوشمندانه هموار کنید.</p>
            </div>
            <Statics/>
        </div>
    )
}

export default Header
