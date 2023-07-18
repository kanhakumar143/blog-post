'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EachBlog = () => {
    const param = useParams()
    const [blog, setBlog] = useState({})
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("")
    useEffect(() => {
        console.log("router", param?.blogId)
        if (param?.blogId) {
            let dommyData = JSON.parse(window.localStorage.getItem("dommydata")!);
            let data = dommyData.find((ele: any) => ele.id == param?.blogId);
            setBlog(data);
        }

        let cData = JSON.parse(window.localStorage.getItem('comment') || '[]');
        if (cData && cData.length > 0) {
            let data = cData.filter((ele: any) => ele.id == param?.blogId);
            setComments(data);
        }
    }, [])

    const HandleComment = () => {
        let dData = JSON.parse(window.localStorage.getItem('comment') || '[]');
        if (dData.length > 0) {
            let data = {
                id: param?.blogId,
                msg: commentText
            }
            setComments([...comments, data]);
            window.localStorage.setItem("comment", JSON.stringify([...comments, data]));
            setCommentText("")
        } else {
            let Arr = [];
            Arr.push({
                id: param?.blogId,
                msg: commentText
            })
            window.localStorage.setItem("comment", JSON.stringify(Arr));
            setComments(Arr);
            setCommentText("")
        }
    }

    return (
        <>
            <div className='mx-12 py-4'>
                {
                    blog &&
                    <div className='rounded shadow-md hover:shadow-lg p-4'>
                        <p className='font-bold'>Title</p>
                        <p className='text-lg font-semibold'>{blog?.title ? blog?.title : ""}</p>
                        <p className='text-sm font-bold '>Date : <span className='font-light'>{blog?.publish_date ? blog?.publish_date : ""} </span></p>
                        <p className='font-bold'>Summary</p>
                        <p className='text-base font-medium'>{blog?.summery ? blog?.summery : blog?.summery}</p>
                    </div>
                }
                <div className='p-4 mt-3'>
                    <p className='text-lg font-semibold '>All Comments</p>
                    {
                        comments && comments.length > 0 && comments.map((ele, i) => (
                            <div key={i}>
                                <p className='p-2 rounded shadow-md'>{ele?.msg}</p>
                            </div>
                        ))
                    }
                    <div className='mt-8 w-full'>
                        <textarea className='outline-none p-2 h-10 border rounded border-slate-200 w-full' value={commentText} onChange={(e) => { setCommentText(e.target.value) }} />
                        <button className='px-4 py-2 border border-slate-200 shadow-md rounded hover:shadow-lg'
                            onClick={() => HandleComment()}
                        >comment +</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EachBlog