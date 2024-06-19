import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IGenre, IMovieCard } from '../types/types';
import plugPosterPath from '../assets/plug-poster.png';
import { apiUrl } from './MainPage';
import List from '../components/List';
import Button from '@mui/material/Button';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Stack, CircularProgress,  useMediaQuery } from '@mui/material';
import '../styles/MoviePage/MoviePage.css';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovieCard | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<IMovieCard[]>(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  const isBigScreen = useMediaQuery('(min-width:850px)');

  useEffect(() => {
    fetchMovie();
  }, [id]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`, {
        method: 'GET',
        headers: { accept: 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY }
      });
      setMovie(response.data);
      setIsLoad(false);
    } catch (error) {
      console.error('Error fetching movie:', error);
      setIsLoad(false);
    }
  };

  const toggleFavorite = (movie: IMovieCard) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === movie.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  if (!movie) {
    return (
      <Stack>
        <CircularProgress color="primary" className="loader" />
      </Stack>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === movie.id);

  return (
    <div className='movie-page'>
      <img className={isBigScreen?  'movie-page__backround-image' : 'movie-page__backround-image small-screen'} src={movie.poster?.url || ''} alt={'фон для страницы фильма' || ''} />
      <div className="movie-page__poster">
        <img src={movie.poster?.url ?? plugPosterPath} alt={movie.name || ''} />
      </div>
      <div className="movie-page__info">
        <h1 className="movie-page__title">{movie.name ?? movie.alternativeName}</h1>
        <div className="movie-page__info__rating_year">
          <div className={Number(movie.rating.kp || movie.rating.imdb) >= 8 ? "rating green" : "rating grey"}>
            {Math.round(Number(movie.rating.kp || movie.rating.imdb) * 100) / 100}
          </div>
          <p className="year">{movie.year}</p>
        </div>
        <div className="movie-page__info__genres">
          <List items={movie.genres} renderItem={(genre: IGenre) => <span className="genre" key={genre.name}> {genre.name}</span>} />
        </div>
        <p className="movie-page__description">{movie.description || <em>Описание пока не добавлено &#9785;</em>}</p>
        <Button
          onClick={() => toggleFavorite(movie)}
          variant="contained"
          color={isFavorite ? 'secondary' : 'primary'}
          sx={{ width: 180 }}
        >
          {isFavorite ? <><BookmarkIcon/> Удалить</> : <><BookmarkBorderIcon/> В избранное</>}
        </Button>
      </div>
    </div>
  );
}

export default MoviePage;
