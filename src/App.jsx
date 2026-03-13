import React, { useEffect, useState } from 'react'
import axios  from 'axios'


const App = () => {

  const [userdata, setUserdata] = useState([])
  const [index, setIndex] = useState(1)

  const getdata =async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    
      
    setUserdata(response.data)

    
  }

  useEffect(() => {
    getdata()
  }, [index])
  

 

  let printuserdata = <h1 className='text-6xl text-zinc-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Hold on your images are on the way.....</h1>

  if(userdata.length > 0){
    printuserdata = userdata.map(function(elem,idx){
      return <a href={elem.download_url} key={idx} target='_blank'>
      
      <div key={idx} className='flex flex-col items-center gap-2 m-3 overflow-hidden'>
      <div className='h-78 w-85 bg-white rounded-xl mt-5 '>
        <img className='h-full w-full object-cover rounded-xl' src= {elem.download_url} alt={idx} />
      </div>
        <h2 className='font-bold text-xl'>{elem.author}</h2>
        
        </div>
         </a>
    })
  }


  return (


    <div className='bg-black h-screen text-white overflow-auto'>


      <div className='flex flex-wrap gap-4'>
        
        {printuserdata}
        
        </div>
   
<div className="flex justify-center items-center m-12 gap-5">
 
  <button  style = {{opacity : index == 1 ? 0.4 : 1, cursor : index == 1 ? 'not-allowed' : 'pointer'}}
  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg  hover:bg-gray-300 transition" 
    
    onClick= {() => {
      if(index > 1){
        setIndex(index - 1)
        setUserdata([])
               
      }
     
    }}
    >
    ← Previous 
  </button>

    <h1 className='text-2xl '>Page {index}</h1>

  <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer" 
    onClick = {() => {
      setUserdata([])
      setIndex(index + 1 ) }  
    }
  > 
    Next →
  </button>
</div>



    </div>
    
  )

}

export default App