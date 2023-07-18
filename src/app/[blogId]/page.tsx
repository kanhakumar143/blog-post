import EachBlog from '@/components/EachBlog'
import React from 'react'
import { useRouter } from 'next/router'

const OneBlog = () => {
  // const router = useRouter();

  // if(router.isReady){
  //   console.log(router)
  // }
  
  return (
    <>
      <EachBlog />
    </>
  )
}

export default OneBlog