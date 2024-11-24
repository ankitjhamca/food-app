import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SingleCategory = () => {
    const {category} = useParams()
    const [meals,setMeals] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchMeals = async() => {
            try{
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
                const data = await res.json()
                console.log(data)
                setMeals(data.meals)
            }catch(error){
                console.log(error)
            }
        }
        fetchMeals()
    },[category])
  return (
    <section className='py-12'>
      <h2 className='text-2xl font-semibold mb-5'>{category}</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10 gap-3'>
      {
        meals.map((meal)=>{
            return <div key={meal.idMeal} onClick={()=>navigate(`/meal/${meal.idMeal}`)} className='text-center shadow-xl rounded-xl p-3 cursor-pointer hover:scale-105 transition'>
            <img src={meal.strMealThumb} alt={meal.strMeal} loading='lazy'/>
            <p className='lg:text-xl text-sm mt-3'>{meal.strMeal}</p>
         </div>
        })
      }
    </div>
    </section>
  )
}

export default SingleCategory
