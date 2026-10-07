import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App(){
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchRecipes = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      
      if (response.data.meals) {
        setRecipes(response.data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found. Try another!!");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '60%', margin: 'auto'}}>

      {/* input  */}
      <h1>🍝 Recipe Finder</h1>
      <form onSubmit={searchRecipes}>
        <input type="text" placeholder="Enter a meal(ex- pasta)" value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '10px', width: '70%', borderRadius:'5px', border: 'solid' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '10px'}}>
          Search
        </button>
      </form>

      {/* loading */}
      {loading && <p>Loading....</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* sResult  */}
      <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '20px', marginTop:'20px' }}>
        {recipes.map((meal) => (
          <div key={meal.idMeal} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', borderRadius: '5px' }} />
            <h3>{meal.strMeal}</h3>
            <p><b>Category:</b> {meal.strCategory}</p>
            <details>
              <summary style={{color: 'blue' }}>View Instructions</summary>
              <p style={{ fontSize: '14px', marginTop: '10px', lineHeight: '1.5' }}>
                {meal.strInstructions}
              </p>
            </details>
            <a href={meal.strYoutube} style={{textDecoration:'none', display:'inline-block' ,marginTop: '10px'}}>YouTube</a>
          </div>
        ))}
      </div> 
      
    </div>
  );
};

export default App;