import useBillboard from '@/hooks/useBillboard';
import React, { useEffect, useState } from 'react'
import {useCallback } from 'react'
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';
import Link from 'next/link';

interface AnimeInfo {
  id: number;
  id_provider: {
    idGogo: string;
  };
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
  score: {
    averageScore: number;
  }
  trailer: {
    id: string;
  }
  tags: {
    id: number;
    name: string;
  }[];
}

const Billboard = () => {
    const { openModal } = useInfoModal();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(""); 
    const [animeInfo, setAnimeInfo] = useState<AnimeInfo | null>(null);

    const getRandomElement = () => {
      const arr = [16498, 101922, 1535, 21459, 21087, 20958, 11757, 20, 21, 21519, 20954, 99147, 21856, 101759, 20755];
      return arr[Math.floor(Math.random() * arr.length)];
    };

    useEffect(() => {
        const movieId = getRandomElement();
    
        const fetchAnimeInfo = async () => {
          setIsLoading(true);
          setError("");
          try {
            const response = await fetch(
              `https://api.amvstr.me/api/v2/info/${movieId}`
            );
            const data = await response.json();
    
            if (response.ok) {
              setAnimeInfo(data);
            } else {
              setError(data.message || "Failed to fetch anime information");
            }
          } catch (err) {
            setError("Error loading anime information. Please try again later.");
            console.error("Fetch error:", err);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAnimeInfo();
      }, []);

      // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Handle error state
  if (error || !animeInfo) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-zinc-900">
        <div className="text-red-500 mb-4">{error || "Anime not found"}</div>
        <Link
          href="/"
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Go Back Home
        </Link>
      </div>
    );
  }
  
    const displayTitle = animeInfo.title.english || animeInfo.title.userPreferred;

    const videoUrl = `https://www.youtube.com/watch?v=${animeInfo?.trailer?.id}`;

    console.log("Video URL", videoUrl);

  return (
    <div className="relative h-[56.25vw]">
      {/* <video poster={animeInfo?.bannerImage} className="w-full h-[48.25vw] object-cover brightness-[60%] transition duration-500" autoPlay muted loop src={videoUrl}></video> */}
      <iframe
  className="w-full h-[54vw] object-cover brightness-[60%] transition duration-500"
  src={`https://www.youtube.com/embed/${animeInfo?.trailer?.id}?autoplay=1&mute=1&loop=1&playlist=${animeInfo?.trailer?.id}&controls=0&modestbranding=1&showinfo=0&rel=0`}
  allow="autoplay; encrypted-media"
  allowFullScreen
  title="YouTube Video"
/>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {displayTitle}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[60%] md:w-[80%] lg:w-[50%] drop-shadow-xl line-clamp-2">
          {animeInfo?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={animeInfo?.id.toString()} />
        </div>
      </div>
    </div>
  )
}

export default Billboard