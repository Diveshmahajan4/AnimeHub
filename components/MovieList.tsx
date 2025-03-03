import React from 'react'

// import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';

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

interface MovieListProps {
  data: AnimeData[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }
  
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((anime) => (
            <MovieCard key={anime.id} data={anime} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList