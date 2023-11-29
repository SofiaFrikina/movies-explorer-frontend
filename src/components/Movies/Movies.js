import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/Movies';

function Movies() {
    return (
        <div className="movies">
            <SearchForm />
            <MoviesCardList movies={movies} />
        </div>
    )
}

export default Movies;