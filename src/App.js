import './App.css';
import { getMovieList, searchMovie } from "./api"
import { useEffect, useState } from "react"

const App = () => {
   const [popuplarMovies, setPopularMovies] = useState([])
  
  useEffect(() => {
    getMovieList().then((result) =>{
      setPopularMovies(result)
    })
  }, [])

  const PopuplarMoviesList = () => {
    return popuplarMovies.map((movie, i) => {
      return (
        <div className="movieWrapper" key={i}>
        <img className="movieImage" 
          src={`${process.env.REACT_APP_BASEIMAGE}/${movie.poster_path}`} 
        />
        <div className="movieTitle">{movie.title}</div>
        <div className="movieID">Movie ID: {movie.id}</div>
        <div className="moviePopularity">Popularity : {movie.popularity}</div>
        <div className="movieOverview">{movie.overview}</div>
      </div>
      )

    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  console.log({ popuplarMovies: popuplarMovies })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Data Base</h1>
        <input
          placeholder="Seacrh Movie" className="movieSearch"
          onChange={({ target }) => search(target.value)} />
        <div className="movieContainer">
          <PopuplarMoviesList />
        </div>
      </header>
    </div>
  )
}

export default App
