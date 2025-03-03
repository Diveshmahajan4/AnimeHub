import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

// Define interfaces for anime details
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
  tags: {
    id: number;
    name: string;
  }[];
}

// Player page component
const AnimePage = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch anime info when ID changes
  useEffect(() => {
    if (!movieId) return;

    const fetchAnimeInfo = async () => {
      setIsLoading(true);
      setError(null);
      console.log("ID", movieId);
      try {
        const response = await fetch(
          `https://api.amvstr.me/api/v2/info/${movieId}`
        );
        const data = await response.json();

        if (response.ok) {
          console.log("Anime provider: ", data.id_provider.idGogo);
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
  }, [movieId]);

  // Change episode and update video source
  const changeEpisode = (episode: number) => {
    if (episode < 1 || (animeInfo && episode > animeInfo.episodes)) return;

    setCurrentEpisode(episode);

    // Reset video and load new episode
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  };

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

  // Determine title to display
  const displayTitle = animeInfo.title.english || animeInfo.title.userPreferred;

  return (
    <div className="h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Navigation bar */}
      <div className="flex items-center bg-zinc-800">
        <Link href="/" className="flex items-center p-4 hover:bg-zinc-600 rounded-md">
          <BsArrowLeft className="" />
        </Link>
        <h1 className="text-xl font-bold ml-2 truncate py-4">{displayTitle}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {/* Sidebar with anime info */}
        <div className="bg-zinc-800 overflow-y-auto col-span-1 scrollbar-hide">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              <div className="p-2">
                <img
                  src={animeInfo.coverImage.large}
                  alt={displayTitle}
                  className="h-full w-full rounded-md mb-4"
                />
              </div>
              <div className="py-4">
                <h2 className="text-xl font-bold mb-2">{displayTitle}</h2>
                <div className="mb-4">
                  <p className="text-green-400">
                    {animeInfo.score.averageScore}% Rating
                  </p>
                  <p>
                    {animeInfo.format} • {animeInfo.episodes} Episodes •{" "}
                    {animeInfo.duration} min
                  </p>
                  <p>
                    {animeInfo.seasonYear} • {animeInfo.status}
                  </p>
                </div>
                {/* Genres */}
                <div className="mb-4">
                  <h3 className="font-bold mb-1">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {animeInfo.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-zinc-700 px-2 py-1 rounded-md text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h3 className="font-bold mb-1">Synopsis</h3>
              <div
                className="text-sm text-gray-300"
                dangerouslySetInnerHTML={{ __html: animeInfo.description }}
              />
            </div>

            {/* Tags */}
            <div className="mb-4">
              <h3 className="font-bold mb-1">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {animeInfo.tags.slice(0, 8).map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-zinc-700 px-2 py-1 rounded-md text-xs"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Episode list */}
            <div className="pb-8 mb-8">
              <h3 className="font-bold mb-2">Episodes</h3>
              <div className="grid grid-cols-4 gap-2">
                {Array.from(
                  { length: animeInfo.episodes },
                  (_, i) => i + 1
                ).map((ep) => (
                  <button
                    key={ep}
                    onClick={() => changeEpisode(ep)}
                    className={`flex items-center justify-center p-2 rounded-md ${
                      currentEpisode === ep
                        ? "bg-red-500 text-white"
                        : "bg-zinc-700 hover:bg-zinc-600"
                    }`}
                  >
                    {ep}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video player section */}
        <div className="grid col-span-2">
          <div className="p-10">
            {/* Video player */}
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full h-3/4"
              poster={animeInfo.bannerImage || animeInfo.coverImage.extraLarge}
            >
              <source
                src={`https://api.amvstr.me/api/v2/stream/${animeInfo.id_provider.idGogo}/${currentEpisode}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
