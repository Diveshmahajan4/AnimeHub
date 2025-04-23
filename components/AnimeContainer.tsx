import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import MovieList from './MovieList';

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

interface PaginationData {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
  perPage: number;
  total: number;
}

interface AnimeResponse {
  code: number;
  message: string;
  page: PaginationData;
  results: AnimeData[];
}

interface AnimeContainerProps {
  title: string;
  apiEndpoint: string;
  isPagination: boolean;
}

const AnimeContainer: React.FC<AnimeContainerProps> = ({ title, apiEndpoint, isPagination }) => {
  const [animeData, setAnimeData] = useState<AnimeData[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    hasNextPage: false,
    lastPage: 1,
    perPage: 20,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimeData = async (page: number = 1) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${apiEndpoint}?p=${page}`, {
        method: 'GET',
      });
      const data: AnimeResponse = await response.json();
  
      if (data.code === 200) {
        setAnimeData(data.results);
        setPagination(data.page);
      } else {
        setError(data.message || 'Failed to fetch anime data');
      }
    } catch (err) {
      setError('Error fetching anime data. Please try again later.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData(1);
  }, [apiEndpoint]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      fetchAnimeData(newPage);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const current = pagination.currentPage;
    const last = pagination.lastPage;
    const delta = 2;
    const range = [];
    
    range.push(1);
    
    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(last - 1, current + delta);
    
    if (rangeStart > 2) {
      range.push('...');
    }
    
    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }
    
    if (rangeEnd < last - 1) {
      range.push('...');
    }
    
    if (last > 1) {
      range.push(last);
    }
    
    return range;
  };

  return (
    <div className="flex flex-col">
      {isLoading && isEmpty(animeData) ? (
        <div className="flex justify-center items-center h-40">
          <div className="text-white">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <>
          <MovieList title={title} data={animeData} />
          
          {/* Pagination controls */}
          {!isEmpty(animeData) && isPagination && pagination.lastPage > 1 && (
            <div className="flex justify-center items-center mt-8 mb-8">
              <div className="flex space-x-2">
                {/* Previous page button */}
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`px-4 py-2 rounded-md ${
                    pagination.currentPage === 1
                      ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                      : 'bg-zinc-800 text-white hover:bg-zinc-600'
                  }`}
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                <div className="flex space-x-2">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        page === pagination.currentPage
                          ? 'bg-red-600 text-white'
                          : page === '...'
                          ? 'bg-transparent text-white cursor-default'
                          : 'bg-zinc-800 text-white hover:bg-zinc-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                {/* Next page button */}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className={`px-4 py-2 rounded-md ${
                    !pagination.hasNextPage
                      ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                      : 'bg-zinc-800 text-white hover:bg-zinc-600'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnimeContainer;