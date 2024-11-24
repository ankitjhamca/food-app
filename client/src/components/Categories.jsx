import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const [categories,setCategories] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchCategories = async() => {
            try{
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);

                const data = await res.json()
                setCategories(data.categories)

            }catch(error){
                console.log(error)
            }
        }
        fetchCategories()
    },[])
  return (
   <section className='py-12'>

    <h2 className='mb-5 text-2xl font-semibold'>All categories</h2>
     <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-10 gap-3'>
      {
        categories.map((category)=>{
            return <div key={category.idCategory} className='text-center shadow-xl rounded-xl p-3 cursor-pointer hover:scale-105 transition' onClick={()=>navigate(`/categories/${category.strCategory}`)}>
               <img src={category.strCategoryThumb} alt={category.strCategory} loading='lazy'/>
               <p className='lg:text-xl text-sm mt-3'>{category.strCategory}</p>
            </div>
        })
      }
    </div>
   </section>
  )
}

export default Categories
