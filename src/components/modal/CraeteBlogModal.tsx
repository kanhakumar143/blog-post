import { Dialog, Transition } from '@headlessui/react'
import moment from 'moment'
import { Fragment, useState } from 'react'

interface TProps {
    isOpen: boolean,
    setIsOpen: Function,
    blogs:any,
    setBlogs:Function
}
export default function CraeteBlogModal({ isOpen, setIsOpen,setBlogs, blogs }: TProps) {
    const [createData, setCreateData] = useState({
        title:"",
        summery:"",
        titleErr:false,
        summaryErr:false
    })

    const HandleCreate = () => {
        if(!createData.title){
            setCreateData({...createData, titleErr:true})
            return
        }else if(!createData.summery){
            setCreateData({...createData, summaryErr:true})
            return
        }

        let newdata = 
        {
            "publish_date": moment().format("DD-MM-YYYY"),
            "id": blogs.length + 1,
            "title": createData.title,
            "summery": createData.summery
        }
        let newCopy = [...blogs, newdata];
        window.localStorage.setItem("dommydata", JSON.stringify(newCopy));
        setBlogs(newCopy);
        setIsOpen(false);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-4 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Create New Blog Post
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div>
                                            <p className="text-lg text-gray-500">Title</p>
                                            <input type="text" className={`outline-none border ${createData.titleErr ? "border-red-500" : "border-slate-300" } p-2 w-full rounded`}
                                            value={createData?.title}
                                            onChange={(e) => {setCreateData({...createData,title:e.target.value, titleErr:false })}}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-lg text-gray-500">Content</p>
                                            <textarea className={`outline-none border ${createData.summaryErr ? "border-red-500" : "border-slate-300" } p-2 w-full rounded`}
                                            value={createData?.summery}
                                            onChange={(e) => {setCreateData({...createData,summery:e.target.value, summaryErr:false })}}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-lg text-gray-500">Image</p>
                                            <input type="file" />
                                        </div>
                                    </div>

                                    <div className="mt-4 gap-2 flex justify-end">
                                        <button
                                            type="button"
                                            className='px-4 py-2 border border-slate-200 shadow-md rounded hover:shadow-lg'
                                            onClick={() => { HandleCreate() }}
                                        >
                                            Craete
                                        </button>
                                        <button
                                            type="button"
                                            className='px-4 py-2 border border-slate-200 shadow-md rounded hover:shadow-lg'
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
