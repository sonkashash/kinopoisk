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

const MainPage: React.FC = () => {
  const limitPerPage: number = 50;

  const [cards, setCards] = useState<IMovieCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [filters, setFilters] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([1990, 1995]);

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': 'FM39E85-84EMRJN-NMNH4PY-BRJACPM' }
  };

  useEffect(() => {
    fetchMovies();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [page, filters, years]);

  async function fetchMovies() {
    try {
      const queryParams = new URLSearchParams();
      filters.forEach(filter => queryParams.append('genres.name', filter));
      queryParams.append('year', `${years[0]}-${years[1]}`);
      const queries = queryParams.toString();
      setIsLoad(true);
      const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limitPerPage}&${queries}`, options);
      setCards(response.data.docs);
      setPageTotal(response.data.pages);
      setPage(response.data.page);
      setIsLoad(false);
      console.log(`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limitPerPage}&${queries}`);
    } catch (e) {
      alert(e);
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

  return (
    <>
      <div className='main-container'>
        <div className="filters">
          <div className='years'>
            <p>Годы</p>
            <FilterYears selectedYears={years} onYearsChange={handleYearsChange} />
          </div>
          <FilterGenres selectedGenres={filters} onGenresChange={handleFiltersChange} />
        </div>
        <div className='movie-list'>
          {isLoad ? (
            <Stack>
              <CircularProgress color="primary" className="loader" />
            </Stack>
          ) : (
            <>
              <List items={cards} renderItem={(card: IMovieCard) => <MovieCard card={card} key={card.id} />} />
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
