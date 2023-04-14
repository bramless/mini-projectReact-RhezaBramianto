import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "./api";
import { Modal, Button } from "react-bootstrap";

const ContentBody = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div
          className="movieWrapper"
          key={i}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <img
            className="movieImage"
            style={{ borderRadius: "10px 10px 0 0" }}
            src={`${process.env.REACT_APP_BASEIMAGE}/${movie.poster_path}`}
            alt={movie.title}
            onClick={() => {
              setSelectedMovie(movie);
              setShowModal(true);
            }}
          />
          <Button variant="warning" 
            style={{ borderRadius: "0 0 10px 10px" }}
            onClick={() => {
            setSelectedMovie(movie);
            setShowModal(true);
          }}>
            Details
          </Button>
        </div>
      );
    });
  };

  const search = async (event, q) => {
    if (event.key === 'Enter' && q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="MovieDatabase">
      <header className="App-header">
        <input
          placeholder="Search Movie"
          className="movieSearch"
          style={{ margin: "10px 10px", borderRadius: "10px", padding: "8px" }}
          onKeyDown={(event) => search(event, event.target.value)}
        />
        <div className="movieContainer">
          <PopularMoviesList />
        </div>
      </header>
      {selectedMovie && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header style={{ border: 0, color : "White"}}  closeButton>
            <Modal.Title>{selectedMovie.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="image-modal"
              src={`${process.env.REACT_APP_BASEIMAGE}/${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
              style={{ width: "100%" }}
            />
            <p style={{ color :"white", marginTop:"2px"}}>Movie ID : {selectedMovie.id} | Popularity : {selectedMovie.popularity}</p>
            <p style={{ color :"white"}}>{selectedMovie.overview}</p>
          </Modal.Body>
          <Modal.Footer style={{ border: 0 }} >
            <Button variant="warning" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ContentBody;

