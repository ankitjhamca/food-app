import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MealDetails = () => {
    const { id } = useParams(); // Extract meal id from URL
    const [meal, setMeal] = useState(null); // State to store fetched meal data
    const [loading, setLoading] = useState(true); // State for loading status

    useEffect(() => {
        const fetchMeal = async () => {
            setLoading(true); // Start loading
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await res.json();
                setMeal(data.meals[0]); // Update meal state with the fetched data
            } catch (error) {
                console.log(error); // Log any error
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchMeal(); // Call function to fetch meal data
    }, [id]); // Re-run when `id` changes

    // Loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Meal not found state
    if (!meal) {
        return <p>Meal not found!</p>;
    }

    // Extract meal details
    const {
        strMeal,
        strMealThumb,
        strCategory,
        strArea,
        strInstructions,
        strYoutube,
    } = meal

    // Helper to format and display ingredients
    const getIngredients = () => {
        let ingredients = []
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]
            if (ingredient) {
                ingredients.push(`${ingredient} - ${measure}`)
            }
        }
        return ingredients
    }

    return (
        <div className='py-12'>
            <h2 className='text-2xl font-bold mb-3'>{strMeal}</h2>
            <img src={strMealThumb} alt={strMeal} className='rounded-lg h-80 object-cover  mb-4' />

            <div className='text-gray-700 mb-4'>
                <p><strong>Category:</strong> {strCategory}</p>
                <p><strong>Area:</strong> {strArea}</p>
            </div>

            <div className='text-gray-700 mb-4'>
                <h3 className='font-bold text-lg mb-2'>Ingredients:</h3>
                <ul className='list-disc list-inside'>
                    {getIngredients().map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div className='text-gray-700'>
                <h3 className='font-bold text-lg mb-2'>Instructions:</h3>
                <p>{strInstructions}</p>
            </div>

            {strYoutube && (
                <div className='mt-4'>
                    <a href={strYoutube} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
                        Watch on YouTube
                    </a>
                </div>
            )}
        </div>
    );
};

export default MealDetails;
