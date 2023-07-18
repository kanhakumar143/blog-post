'use client'
import React, { useEffect, useState } from 'react'
import {dommydata} from "@/data/domydata"
import Link from 'next/link'
import CraeteBlogModal from './modal/CraeteBlogModal'

const Posts = () => {
    const [blogs, setBlogs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let dData = JSON.parse(window.localStorage.getItem('dommydata') || '[]');
        if(dData.length > 0) {
            setBlogs(dData);
        }else{
            window.localStorage.setItem("dommydata", JSON.stringify(dommydata));
            setBlogs(dommydata);
        }
    }, [])

    // let pages;
    // if(blogs.length > 0 ){
    //     let total =  blogs.length;
    //     let perPage = 10
        
    //     let pagesCount = Math.ceil(total / perPage);
    //     if (pagesCount === 1) return null;
    //     pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    // }


    return (
        <>
        <div className='p-8'>
            <div className='flex justify-end my-2'>
                <button className='px-4 py-2 border border-slate-200 shadow-md rounded hover:shadow-lg'
                onClick={()=>setIsOpen(true)}
                >
                    Create Post +
                </button>
            </div>
            {
                blogs && blogs.length > 0 && blogs.map((blog, ix) => (
                    <Link href={`/${blog.id}`} key={ix} >
                        <div  className='rounded shadow-md hover:shadow-lg p-4'>
                        <p className='text-lg font-semibold'>{blog?.title}</p>
                        <p className='text-sm font-light'>{blog.publish_date}</p>
                        <p className='text-base font-medium'>{blog.summery}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
        {
            isOpen && 
            <CraeteBlogModal 
                isOpen={isOpen} 
                blogs={blogs}
                setIsOpen={setIsOpen}
                setBlogs={setBlogs}
            />
        }
        {/* <div className='flex justify-center gap-2 mb-10 px-8'>
            {
                pages && pages.length > 0 && pages.map((ele, i) => (
                    <p className={`h-10 w-10 flex justify-center items-center bg-gray-400 rounded shadow-md cursor-pointer text-white`} key={i}>
                        {ele}
                    </p>
                ))
            }
        </div> */}
        </>
    )
}

export default Posts