import React, { useState, useEffect } from 'react';
import { IMovieCard } from '../types/types';
import List from '../components/List';
import axios from 'axios';
import MovieCard from '../components/MainPage/MovieCard';
import FilterGenres from '../components/MainPage/FilterGenres';
import FilterYears from '../components/MainPage/FilterYears';
import FilterRating from '../components/MainPage/FilterRating';
import { Pagination, Stack, Button, CircularProgress, useMediaQuery} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import UseLocalStorage from '../components/UseLocalStorage';

const limitPerPage = 50;
const maxMovieRating = 10;
export const apiUrl = 'https://api.kinopoisk.dev/v1.4/movie';

const MainPage: React.FC = () => {
  const isBigScreen = useMediaQuery('(min-width:800px)');
  const navigate = useNavigate();

  const [cards, setCards] = useState<IMovieCard[]>([]);
  const [page, setPage] = useState<number>(() => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage, 10) : 1;
  });
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [filters, setFilters] = UseLocalStorage<string[]>('filters', []);
  const [years, setYears] = UseLocalStorage<number[]>('years', [1990, 2024]);
  const [rating, setRating] = UseLocalStorage<number>('rating', 0);
  const [favorites, setFavorites] = UseLocalStorage<IMovieCard[]>('favorites', []);

  useEffect(() => {
    fetchMovies();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [page, filters, years, rating]);

  async function fetchMovies() {
    setIsLoad(true);
    try {
      const queryParams = new URLSearchParams();
      filters.forEach(filter => queryParams.append('genres.name', filter));
      queryParams.append('year', `${years[0]}-${years[1]}`);
      queryParams.append('rating.kp', `${rating}-${maxMovieRating}`);
      queryParams.append('rating.imdb', `${rating}-${maxMovieRating}`);
      const queries = queryParams.toString();

      const response = await axios.get(`${apiUrl}?page=${page}&limit=${limitPerPage}&${queries}`, {
        method: 'GET',
        headers: { accept: 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY}
      });

      setCards(response.data.docs);
      setPageTotal(response.data.pages);
      setIsLoad(false);
    } catch (error) {
      setIsLoad(false);
      console.log( error);
    }
  }

  const handleChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    setter(value);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters([]);
    setYears([1990, 2024]);
    setRating(0);
    setPage(1);
  };

  const handleMovieClick = (movieId: number) => {
    localStorage.setItem('currentPage', String(page));
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className={isBigScreen? 'main-container' : 'main-container small-screen'}>
      <div className="filters">
        <h1 className="filters__title">Фильтры</h1>
        <FilterRating selectedRating={rating} onRatingChange={(newRating) => handleChange(setRating, newRating)} />
        <FilterGenres selectedGenres={filters} onGenresChange={(newFilters) => handleChange(setFilters, newFilters)} />
        <FilterYears selectedYears={years} onYearsChange={(newYears) => handleChange(setYears, newYears)} />
        <Button onClick={resetFilters} variant="contained" color="primary">Сбросить фильтры</Button>
      </div>
      <div className='movie-list'>
        <h1 className='movie-list__title'>Фильмы</h1>
        {isLoad ? (
          <Stack>
            <CircularProgress color="primary" className="loader" />
          </Stack>
        ) : (
          <>
            <List items={cards} renderItem={(card: IMovieCard) => (
              <div onClick={() => handleMovieClick(card.id)} key={card.id} style={{ cursor: 'pointer' }}>
                <MovieCard card={card} />
              </div>
            )} />
          </>
        )}
        <Pagination
          count={pageTotal}
          onChange={(_, num: number) => setPage(num)}
          page={page}
          color="primary"
        />
      </div>
    </div>
  );
}

export default MainPage;



