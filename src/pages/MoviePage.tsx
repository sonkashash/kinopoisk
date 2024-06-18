import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IGenre, IMovieCard } from '../types/types';
import { baseUrl, options } from './MainPage';
import plugPosterPath from '../assets/plug-poster.png'
import '../styles/MoviePage/MoviePage.css'
import List from '../components/List';


const MoviePage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  console.log(id)
  const [movie, setMovie] = useState<IMovieCard | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  async function fetchMovie() {
    try {
      const response = await axios.get(`${baseUrl}/${id}`, options);
      setMovie(response.data);
      console.log(response.data)
      setIsLoad(false);
    } catch (error) {
      console.error('Error fetching movie:', error);
      setIsLoad(false);
    }
  };

  if (isLoad) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }


  return (
    <div className='movie-page'>
      <img className="movie-page__backround-image" src={movie.poster?.url ?? ''} alt={'фон для страницы фильма'} />
      <div className="movie-page__poster">
        <img src={movie.poster?.url ?? plugPosterPath} alt={movie.name} />
      </div>
      <div className="movie-page__info">
        <h1 className="movie-page__title">{movie.name ?? movie.alternativeName}</h1>
        <div className="movie-page__info__rating_year" >
          <div className={Number(movie.rating.kp || movie.rating.imdb) >= 8 ? "rating green" : "rating grey"}>{Math.round(Number(movie.rating.kp || movie.rating.imdb) * 100) / 100}</div>
          <p className="year">{movie.year}</p>
        </div>
        <div className="movie-page__info__genres"><List items={movie.genres} renderItem={(genre: IGenre) => <span className="genre"> {genre.name}</span>} /></div>
        <p className="movie-page__description">{movie.description ?? <em>Описание пока не добавлено &#9785;</em>}</p>
      </div>

    </div>
  )
}

export default MoviePage




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { IMovieCard } from '../types/types';

// const MovieDetail: React.FC = () => {

//   const [isLoading, setIsLoading] = useState<boolean>(true);



//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!movie) {
//     return <div>Movie not found</div>;
//   }

//   return (
//    
//   );
// };

// export default MovieDetail;
