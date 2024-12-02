"use client"
import React from 'react'
import Image from 'next/image'
import './movie-detail.css'
import { useTheme } from "../../context/ThemeContext";
import {Progress} from "@nextui-org/progress";
import { Movie } from '@/interfaces/movie';

const MovieDetail = (props :{movie: Movie}) => {
  const { theme } = useTheme();
  const { movie } = props;

  return (
    <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} movie-detail-container rounded-lg grid grid-cols-[1fr_2fr] my-6`}>
      <Image src={movie.Poster} height={100} width={100} alt='Movie Poster' className='rounded-lg movie-poster' />
      <div className='movie-info p-8 flex flex-col justify-between'>
        <h1 className='text-3xl font-extrabold'>{movie.Title}</h1>
        <div className='flex items-center gap-4 movie-rating py-2'><Progress aria-label="Loading..." value={parseInt(movie.imdbRating)*10} className="max-w-md"/>{movie.imdbRating}/10</div>
        <div className='grid grid-cols-[1fr_2fr] font-semibold'><h3>Year:</h3><h3>{movie.Year}</h3></div>
        <div className='grid grid-cols-[1fr_2fr] font-semibold'><h3>Running Time:</h3><h3>{movie.Runtime}</h3></div>
        <div className='grid grid-cols-[1fr_2fr] font-semibold'><h3>Directed By:</h3><h3>{movie.Director}</h3></div>
        <div className='grid grid-cols-[1fr_2fr] font-semibold'><h3>Language:</h3><h3>{movie.Language}</h3></div>
        <p className='py-4'>{movie.Plot}</p>
        <div className='flex gap-4'>
          <button className='play-btn font-bold rounded-lg py-2 px-8'>Play Movie</button>
          <button className='watch-btn font-bold rounded-lg py-2 px-8'>Watch Trailer</button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail