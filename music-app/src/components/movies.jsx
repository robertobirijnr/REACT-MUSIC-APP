import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MovieTable from "./moviestable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColomn: { path: "title", order: "asc" }
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = movie => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};
	handleSort = sortColomn => {
		this.setState({ sortColomn });
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			sortColomn,
			selectedGenre,
			movies: allMovies
		} = this.state;

		if (count === 0) return <p>There is no movies in the database.</p>;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter(m => m.genre._id === selectedGenre._id)
				: allMovies;
		const sorted = _.orderBy(filtered, [sortColomn.path], [sortColomn.order]);
		const movies = paginate(sorted, currentPage, pageSize);

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						selectedItem={this.state.selectedGenre}
						textProperty="name"
						valueProperty="_id"
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<p>Showing {filtered.length} movies in the databse.</p>
					<MovieTable
						movies={movies}
						sortColomn={sortColomn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={filtered.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
