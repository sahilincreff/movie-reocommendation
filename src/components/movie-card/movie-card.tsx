import React from 'react'
import Image from 'next/image';
import { MdPlayCircleOutline } from 'react-icons/md';

const MovieCard = () => {
    // const {movie}=props;

    return (
        <div className='p-2'>
            {/* <Image src='' alt='Movie Image'/> */}
            <div className='movie-name'>
                {/* {movie.name} */}
                Free Guy
                <div className='flex gap-4'>
                    <MdPlayCircleOutline />
                </div>
            </div>
        </div>
    )
}

export default MovieCard