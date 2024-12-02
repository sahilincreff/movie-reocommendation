import React from 'react'
import { MdPlayCircleOutline } from 'react-icons/md';
import { BsPlusCircle } from 'react-icons/bs';
import { Movie } from '@/interfaces/movie';
import Image from 'next/image';

const MovieCard = (props: { movie: Movie, selectedCard: boolean, currView: string, handleMovieClick: () => void }) => {
    const { movie, selectedCard, currView, handleMovieClick } = props;

    return (
        <div className={`flex movie-card ${currView === 'grid' ? 'flex-col justify-between cursor-pointer p-2 rounded-lg' : ''
            } ${selectedCard ? 'bg-gray-200 selected-movie' : ''}`} onClick={handleMovieClick} >
            <Image
                className={`${currView === 'grid' ? 'movie-poster-img rounded' : ''}`}
                src={movie.Poster}
                height="100"
                width="100"
                alt={movie.Title}
            />
            <div className={`flex flex-col gap-2 ${currView === 'grid' ? '' : 'p-4'}`}>
                <h2 className={`movie-title ${currView === 'grid' ? '' : 'text-xl'}`}>{movie.Title}</h2>
                {currView === 'grid' ? <></> : <h2>{movie.Plot}</h2>}
                <div className={`flex ${currView === 'grid' ? '' : ''} gap-4`}>
                    <MdPlayCircleOutline size={24} title='Play Movie' />
                    <BsPlusCircle size={22} title='Add to Watch Later' />
                </div>
            </div>
        </div>
    )
}

export default MovieCard;