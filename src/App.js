import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "8388b6f2";
  const APP_KEY = "f40b81eb3937209a4a79d0f74a5ab97b";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form onSubmit = {getSearch} className="search-form">
        <input className = "search-bar" type="text" value={search} onChange = {updateSearch}/>
        <button className = "search-button" type="submit"> Search</button>
      </form>
      <div className = "recipes">
      {recipes.map(recipe =>(
        <Recipe key = {recipe.recipe.url} title = {recipe.recipe.label} calories = {recipe.recipe.calories} image = {recipe.recipe.image} ingredients = {recipe.recipe.ingredients} />
      ))}
      </div>
    </div>
  );
}

export default App;
