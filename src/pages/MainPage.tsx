import React, { useState, useEffect } from 'react';
import { IMovieCard } from '../types/types';
import List from '../components/List';
import axios from 'axios';
import MovieCard from '../components/MainPage/MovieCard';
import '../styles/MainPage/MainPage.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import FilterGenres from '../components/MainPage/FilterGenres';
import FilterYears from '../components/MainPage/FilterYears';
import FilterRating from '../components/MainPage/FilterRating';
import { Link } from 'react-router-dom';

export const baseUrl = 'https://api.kinopoisk.dev/v1.4/movie';
export const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': 'FM39E85-84EMRJN-NMNH4PY-BRJACPM' }
};

const MainPage: React.FC = () => {

  const limitPerPage: number = 50;
  const [cards, setCards] = useState<IMovieCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [filters, setFilters] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([1990, 2024]);
  const [rating, setRating] = useState<number>(0);
  const maxMovieRating: number = 10;


  useEffect(() => {
    fetchMovies();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [page, filters, years, rating]);

  async function fetchMovies() {
    try {
      const queryParams = new URLSearchParams();
      filters.forEach(filter => queryParams.append('genres.name', filter));
      queryParams.append('year', `${years[0]}-${years[1]}`);
      queryParams.append('rating.kp', `${rating}-${maxMovieRating}`);
      queryParams.append('rating.imdb', `${rating}-${maxMovieRating}`);
      const queries = queryParams.toString();
      const response = await axios.get(`${baseUrl}?page=${page}&limit=${limitPerPage}&${queries}`, options);
      setCards(response.data.docs);
      setPageTotal(response.data.pages);
      setPage(response.data.page);
      setIsLoad(false);
      console.log(response.data.docs);
    } catch (error) {
      let e = error as Error
      alert(e.message.split(' ').at(-1) === '403' ? 'Кончились бесплатные запросы' : e.message)
      setIsLoad(false);
    }
  }

  const handleFiltersChange = (newFilters: string[]) => {
    setFilters(newFilters);
    setPage(1)
  };

  const handleYearsChange = (newYears: number[]) => {
    setYears(newYears);
    setPage(1)
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setPage(1)
  };

  return (
    <>
      <div className='main-container'>
        <div className="filters">

          <h3 className="filters__title">Настройте фильтры</h3>
          <FilterRating selectedRating={rating} onRatingChange={handleRatingChange} />
          <FilterGenres selectedGenres={filters} onGenresChange={handleFiltersChange} />
          <FilterYears selectedYears={years} onYearsChange={handleYearsChange} />
        </div>
        <div className='movie-list'>
          {isLoad ? (
            <Stack>
              <CircularProgress color="primary" className="loader" />
            </Stack>
          ) : (
            <>
              <List items={cards} renderItem={(card: IMovieCard) => (
                <Link to={`/movie/${card.id}`} key={card.id} style={{ textDecoration: 'none' }}>
                  <MovieCard card={card} />
                </Link>
              )} />
            </>
          )}
        </div>
      </div>
      <Stack spacing={2}>
        <Pagination
          showFirstButton
          showLastButton
          count={pageTotal}
          onChange={(_, num: number) => setPage(num)}
          page={page}
          color="primary"
        />
      </Stack>
    </>
  );
}

export default MainPage;
