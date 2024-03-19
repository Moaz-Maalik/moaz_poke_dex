# Pokedex Application

## Installation

To run the Pokedex application locally, follow these steps:

1. Unzip the file.
2. Navigate to the project directory: `cd moaz_poke_dex`.
3. Install dependencies: `npm install`.
4. Start the development server: `npm run dev`. (make sure you are using node version 20)
5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Tech Choices

I've used Vite CLI to bootstrap the project since for a simple application, the alternate choice I had was to use Create React App, which is deprecated. I didn't want to use any complex framework such as Next.js or Remix.

## Approach Explained

I've used the Container/Presentational design pattern in React to keep my data presentation logic separate from data fetching and transformation logic. For this, I've created a PokeDex component which is responsible for displaying the data. It utilizes a custom hook named `useFetchPokeDex` which handles data fetching and transformation.

### Display Data Approach

The `PokeDex` component renders the list if the data from the API is available, else it renders a "loading" message. Each of the list element has a `key` attribute to help React identify which items have changed, are added, or are removed from the list efficiently.

### Data Fetching Approach

The custom hook `useFetchPokeDex` utilizes a `useEffect` with an empty dependency array. It calls an async function which is defined in it to make an API call for the listing API. Then it uses a map to iterate over each Pokemon and make an API call for the detail of that Pokemon. Afterward, it uses a transformation function to transform the data according to our needs. Since `map` is passed an async function, it returns an Array of promises which are resolved through the `Promise.all` method.

### Questions

**Why "Map" function was used to make API calls for each Pokémon's details?**

Using `map` allows parallel execution of API calls for each Pokémon's details, optimizing performance. It creates an array of promises for asynchronous operations, enhancing efficiency by fetching data simultaneously. Unlike a "for" loop in which each API call would have to wait for the last one to complete.

**Why was the `transformData` function defined outside the custom hook body?**

Defining the `transformData` function outside the custom hook body ensures that the function is not recreated on every render, preventing unnecessary memory allocation.

**Why was the `getList` function defined inside the `useEffect`?**

Defining the `getList` function inside the `useEffect` ensures that it is created only when the effect runs, not on every render, preventing unnecessary memory allocation.
