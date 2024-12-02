"use client"
import React, { useState, useEffect } from 'react';
import { BsThreeDotsVertical, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { IoSunnyOutline } from 'react-icons/io5';
import { FaMoon, FaSearch, FaList } from 'react-icons/fa';
import MovieDetail from '../movie-detail/movie-detail';
import { RxCross2 } from "react-icons/rx";
import './movie-list.css';
import { useTheme } from "../../context/ThemeContext";
import { Movie } from '@/interfaces/movie';
import MovieCard from '../movie-card/movie-card';

const MovieList = () => {
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(true);
  const [searchText, setSearchText] = useState("");
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(-1);
  const [filteredMovies, setFilteredMovies] = useState(moviesList);
  const [currView, setCurrview] = useState('grid');
  const [sortBy, setSortBy] = useState<'title' | 'year'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { theme, toggleTheme } = useTheme();
  const currGridCols = 5;

  useEffect(() => {
    const filteredMoviesTemp = moviesList.filter(
      (currMovie) => currMovie.Title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSelectedMovie(null);
    setSelectedMovieIndex(-1);
    setFilteredMovies(filteredMoviesTemp);
  }, [searchText, moviesList]);

  useEffect(() => {
    fetch('/assets/data.json')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setMoviesList(data);
        setFilteredMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const sortedMovies = [...filteredMovies];
    if (sortBy === 'title') {
      sortedMovies.sort((a, b) => {
        if (a.Title < b.Title) return sortOrder === 'asc' ? -1 : 1;
        if (a.Title > b.Title) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'year') {
      sortedMovies.sort((a, b) => {
        const yearA = parseInt(a.Year);
        const yearB = parseInt(b.Year);
        return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
      });
    }
    setFilteredMovies(sortedMovies);
  }, [sortBy, sortOrder]);

  const handleMovieClick = (movie: Movie, index: number) => {
    setSelectedMovie(movie);
    setSelectedMovieIndex(index);
  };

  const handleSearchClose = () => {
    setSearchOpen(!searchOpen);
    setSearchText("");
  };

  const toggleView = () => {
    setCurrview(currView === 'grid' ? 'list' : 'grid');
    setSelectedMovie(null);
    setSelectedMovieIndex(-1);
  };

  const handleSort = (type: 'title' | 'year') => {
    setSortBy(type);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={`p-10 ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className="flex justify-between pb-4 pt-2 items-center">
        <div className={`${!searchOpen ? 'search-container' : ''} flex px-4 py-3 rounded-lg justify-between items-center cursor-pointer`}>
          <FaSearch size={24} onClick={() => setSearchOpen(!searchOpen)} />
          {!searchOpen && (
            <>
              <input
                placeholder="Title, Movies, Keyword"
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent search-input px-4 focus:border-none text-lg"
              />
              <RxCross2 size={24} onClick={handleSearchClose} />
            </>
          )}
        </div>
        <div className="flex justify-between gap-4 cursor-pointer items-center">
          <button className={`p-2`} onClick={() => handleSort('title')}>
            Sort by Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button className={`p-2`} onClick={() => handleSort('year')}>
            Sort by Year {sortBy === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          {theme === 'light' ? <FaMoon size={22} onClick={toggleTheme} /> : <IoSunnyOutline size={24} onClick={toggleTheme} />}
          {currView === 'grid' ? <FaList size={22} onClick={toggleView} /> : <BsFillGrid3X3GapFill size={24} onClick={toggleView} />}
          <BsThreeDotsVertical size={24} />
        </div>
      </div>
      <div className={`${currView === 'grid' ? 'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5' : 'flex flex-col'} gap-4`}>
        {filteredMovies.map((movie, i) => (
          <React.Fragment key={movie.imdbID}>
            {selectedMovie && (currView === 'grid' ? i === Math.floor(selectedMovieIndex / currGridCols) * currGridCols : i == selectedMovieIndex) && (
              <div className="col-span-5">
                <MovieDetail movie={selectedMovie} />
              </div>
            )}
            <MovieCard
              movie={movie}
              selectedCard={i === selectedMovieIndex}
              currView={currView}
              handleMovieClick={() => handleMovieClick(movie, i)}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
