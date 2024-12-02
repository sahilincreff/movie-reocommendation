"use client"
import React, { useState, useEffect } from 'react';
import { MdPlayCircleOutline } from 'react-icons/md';
import { BsPlusCircle } from 'react-icons/bs';
import { BsThreeDotsVertical, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { IoSunnyOutline } from 'react-icons/io5';
import { FaMoon, FaSearch, FaList } from 'react-icons/fa';
import MovieDetail from '../movie-detail/movie-detail';
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';
import './movie-list.css';
import { useTheme } from "../../context/ThemeContext";

const MovieList = () => {
  const [moviesList, setMoviesList] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(true);
  const [searchText, setSearchText] = useState("");
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(-1);
  const [filteredMovies, setFilteredMovies] = useState(moviesList);
  const [currView, setCurrview] = useState('grid');
  const [sortBy, setSortBy] = useState<'title' | 'year'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { theme, toggleTheme } = useTheme();

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
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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
    let sortedMovies = [...filteredMovies];
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

  const handleMovieClick = (movie: any, index: number) => {
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

  const handleSortByTitle = () => {
    setSortBy('title');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByYear = () => {
    setSortBy('year');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={`p-10 ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className="flex justify-between pb-4 pt-2 items-center">
        <div className={`${!searchOpen ? 'search-container' : ''} flex px-4 py-3 rounded-lg justify-between items-center cursor-pointer`}>
          <FaSearch size={20} onClick={() => setSearchOpen(!searchOpen)} />
          {!searchOpen && (
            <>
              <input
                placeholder="Title, Movies, Keyword"
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent search-input px-4 focus:border-none text-lg"
              />
              <RxCross2 size={20} onClick={handleSearchClose} />
            </>
          )}
        </div>
        <div className="flex justify-between gap-4 cursor-pointer items-center">
          <button
            className={`p-2`}
            onClick={handleSortByTitle}
          >
            Sort by Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            className={`p-2`}
            onClick={handleSortByYear}
          >
            Sort by Year {sortBy === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          {theme === 'light' ? (
            <FaMoon size={22} onClick={toggleTheme} />
          ) : (
            <IoSunnyOutline size={24} onClick={toggleTheme} />
          )}
          {currView === 'grid' ? (
            <FaList size={22} onClick={toggleView} />
          ) : (
            <BsFillGrid3X3GapFill size={24} onClick={toggleView} />
          )}
          <BsThreeDotsVertical size={24} />
        </div>
      </div>

      <div className={`${currView === 'grid' ? 'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5' : 'flex flex-col'} gap-4`}>
        {filteredMovies.map((movie, i) => (
          <>
            {selectedMovie && (currView === 'grid' ? i === Math.floor(selectedMovieIndex / 5) * 5 : i == selectedMovieIndex) && (
              <div className="col-span-5">
                <MovieDetail movie={selectedMovie} />
              </div>
            )}
            <div
              key={i}
              className={`flex movie-card ${currView === 'grid' ? 'flex-col justify-between cursor-pointer p-2 rounded-lg' : ''
                } ${i === selectedMovieIndex ? 'bg-gray-200 selected-movie' : ''}`}
              onClick={() => handleMovieClick(movie, i)}
            >
              <Image
                className={`${currView === 'grid' ? 'movie-poster-img rounded' : ''}`}
                src={movie.Poster}
                height="100"
                width="100"
                alt={movie.Title}
              />
              <div className={`flex flex-col gap-2 ${currView === 'grid' ? '' : 'p-4'}`}>
                <h2 className={`movie-title ${currView === 'grid' ? '' : 'text-xl'}`}>{movie.Title}</h2>
                {currView === 'grid' ? (
                  <></>
                ) : (
                  <h2>{movie.Plot}</h2>
                )}
                <div className={`flex ${currView === 'grid' ? '' : ''} gap-4`}>
                  <MdPlayCircleOutline size={24} title='Play Movie' />
                  <BsPlusCircle size={22} title='Add to Watch Later' />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
