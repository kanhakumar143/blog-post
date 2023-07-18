'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const EachBlog = () => {
    const param = useParams()
    const [blog, setBlog] = useState({})
    useEffect(() => {
        console.log("router", param?.blogId)
        if (param?.blogId) {
            let dommyData = JSON.parse(window.localStorage.getItem("dommydata"));
            let data = dommyData.find(ele => ele.id == param?.blogId);
            setBlog(data);
        }
    }, [])


    return (
        <>
            <div className='mx-12 py-4'>
                <div className='rounded shadow-md hover:shadow-lg p-4'>
                    <p className='font-bold'>Title</p>
                    <p className='text-lg font-semibold'>{blog?.title}</p>
                    <p className='text-sm font-bold '>Date : <span className='font-light'>{blog?.publish_date} </span></p>
                    <p className='font-bold'>Summary</p>
                    <p className='text-base font-medium'>{blog?.summery}</p>
                </div>
            </div>
        </>
    )
}

export default EachBlog