// import React, { Component } from "react";
// import { getMovies } from "../services/fakeMovieService";
// class Movies extends Component {
//   state = {
//     movies: getMovies(),
//   };
//   handleDelete = (movie) => {
//     const movies = this.state.movies.filter((m) => m._id !== movie._id);
//     this.setState({ movies });
//   };
//   render() {
//     const { length } = this.state.movies;
//     if (length === 0) {
//       return <p>Showing no movies in database</p>;
//     }
//     return (
//       <>
//         <p>Showing {length} movies in database</p>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Genre</th>
//               <th>Stock</th>
//               <th>Rate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.movies.map((movie) => (
//               <tr key={movie._id}>
//                 <td>{movie.title}</td>
//                 <td>{movie.genre.name}</td>
//                 <td>{movie.numberInStock}</td>
//                 <td>{movie.dailyRentalRate}</td>
//                 <td>
//                   <button
//                     onClick={() => this.handleDelete(movie)}
//                     className="btn btn-danger btn-sm"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </>
//     );
//   }
// }

// export default Movies;
import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/Pagination";
import { paginate } from "../utilis/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../common/ListGroup";
import _ from "lodash";

class movies extends Component {
  state = {
    movies: [],
    filteredMovies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    return this.setState({ movies });
  };

  handleLiked = (movie) => {
    const movies = this.state.movies.map((c) => {
      if (c._id === movie._id) {
        return { ...movie, liked: !movie.liked };
      }
      return c;
    });
    this.setState({ movies });
  };

  handleItemSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  render() {
    const { length } = this.state.movies;
    const {
      currentPage,
      pageSize,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sorted, currentPage, pageSize);
    if (length === 0) {
      return <p>There is no result to show.</p>;
    }

    return (
      <div className="row">
        <div className="col-3">
          {/* <NavBar /> */}
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleItemSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col m-5">
          <p>Showing {filteredMovies.length} Movies in database.</p>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLiked}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            pageSize={pageSize}
            currentPage={currentPage}
            itemsCount={filteredMovies.length}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default movies;
