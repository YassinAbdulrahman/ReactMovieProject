import { Row } from "react-bootstrap";
import MovieCard from "./MovieCard";
import Paginatation from "./Paginatation";

function MovieList({ movies , getPage, pageCount }) {
  return (
    <>
      <Row className="mt-3">
        {movies.length >= 1 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <h2 className="text-center p-5">لا يوجد افلام....</h2>
        )}
      </Row>
      {movies.length >= 1 ? (
          movies.map((movie) => <Paginatation getPage={getPage} pageCount={pageCount}/>)
        ) : (
         null
        )}
      
    </>
  );
}

export default MovieList;
