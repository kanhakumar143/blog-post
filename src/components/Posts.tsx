'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {dommydata} from "@/data/domydata"
import Link from 'next/link'
import CraeteBlogModal from './modal/CraeteBlogModal'

const Posts = () => {
    const [blogs, setBlogs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [allData, setAllData] = useState([])
    const [pages, setpages] = useState([])


    let paginate = (items:any, pageNumber:any, pageSize:any) => {
        const startIndex = (pageNumber - 1) * pageSize;
        return items.slice(startIndex, startIndex + pageSize);
    }


    useEffect(() => {
        let dData = JSON.parse(window.localStorage.getItem('dommydata') || '[]');
        if(dData.length > 0) {
            setAllData(dData)
            let pagenateData =  paginate(dData, 1, 7);
            setBlogs(pagenateData);
        }else{
            window.localStorage.setItem("dommydata", JSON.stringify(dommydata));
            setAllData(dommydata)
            let pagenateData =  paginate(dommydata, 1, 7);
            setBlogs(pagenateData);
        }
    }, [])


    useEffect(() => {
        if(allData.length > 0 ){
            let total =  allData.length;
            let perPage = 10
            let pagesCount = Math.ceil(total / perPage);
            if (pagesCount === 1) return null;
            let all_pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
            setpages(all_pages)
        }
    }, [allData])
    

    const HandlePagenate = (index:number) => {
        let pagenateData =  paginate(allData, index+1, 7);
        setBlogs(pagenateData);
    }


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
        <div className='flex justify-center gap-2 mb-10 px-8'>
            {
                pages && pages.length > 0 && pages.map((ele, i) => (
                    <button className={`h-10 w-10 flex justify-center items-center bg-gray-400 rounded shadow-md cursor-pointer text-white`} 
                        key={i}
                        onClick={() => HandlePagenate(i)}
                    >
                        {ele}
                    </button>
                ))
            }
        </div>
        </>
    )
}

export default Posts