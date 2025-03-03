import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiFillCaretDown } from 'react-icons/ai';
import { isEmpty } from 'lodash';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';

interface AnimeData {
  id: number;
  idMal: number;
  title: {
    english: string;
    native: string;
    romaji: string;
    userPreferred: string;
  };
  coverImage: {
    color: string;
    extraLarge: string;
    large: string;
    medium: string;
  };
  bannerImage: string;
  description: string;
  duration: number;
  episodes: number;
  format: string;
  genres: string[];
  seasonYear: number;
  status: string;
  averageScore: number;
}

interface MovieCardProps {
  data: AnimeData;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  // const { openModal } = useInfoModal();

  const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);

  const thumbnailUrl = data.coverImage.large || data.coverImage.medium;
  
  const genre = data.genres && data.genres.length > 0 ? data.genres[0] : '';

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img 
        onClick={redirectToWatch} 
        src={thumbnailUrl} 
        alt={data.title.english || data.title.userPreferred} 
        draggable={false} 
        className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          delay-300
          w-full
          h-[12vw]
        " 
      />
      <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      ">
        <img 
          onClick={redirectToWatch} 
          src={thumbnailUrl} 
          alt={data.title.english || data.title.userPreferred} 
          draggable={false} 
          className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-t-md
            w-full
            h-[12vw]
          " 
        />
        <div className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
        ">
          <div className="flex flex-row items-center gap-3">
            <div onClick={redirectToWatch} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              <BsFillPlayFill className="text-black w-4 lg:w-6" />
            </div>
            <FavoriteButton movieId={data?.id.toString()} />
            {/* <div onClick={() => openModal(data?.id.toString())} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <AiFillCaretDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div> */}
          </div>
          <p className="text-green-400 font-semibold mt-4">
            {data.title.english || data.title.userPreferred} <span className="text-white"></span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center"> 
            <p className="text-white text-[10px] lg:text-sm">{data.duration} min • {data.episodes} eps</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{data.genres.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;