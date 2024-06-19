import React, { FC, useState, useEffect } from 'react';
import { IMovieCard } from '../../types/types';
import '../../styles/MainPage/MovieCard.css';
import plugPosterPath from '../../assets/plug-poster.png';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface MovieCardProps {
    card: IMovieCard;
}

const MovieCard: FC<MovieCardProps> = ({ card }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(storedFavorites.some((fav: IMovieCard) => fav.id === card.id));
    }, [card]);

    const toggleFavorite = (movie: IMovieCard) => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorite = storedFavorites.some((fav: IMovieCard) => fav.id === movie.id);
        if (isFavorite) {
            const updatedFavorites = storedFavorites.filter((fav: IMovieCard) => fav.id !== movie.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            const updatedFavorites = [...storedFavorites, movie];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(true);
        }
    };

    return (
        <div className="movie-card">
            <div className="movie-card__poster">
                <img src={card.poster?.url ?? plugPosterPath} alt={card.name} />
            </div>
            <div className={Number(card.rating.kp || card.rating.imdb) >= 8 ? "movie-card__rating green" : "movie-card__rating grey"}>
                {Math.round(Number(card.rating.kp || card.rating.imdb) * 100) / 100}
            </div>
            <h3 className="movie-card__name">{card.name ?? card.alternativeName ?? 'Нет названия'}</h3>
            <div className="movie-card__info">
                <button className="movie-card__info__favourites-btn" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleFavorite(card)
                }}>
                    {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </button>
                <div className="movie-card__info__year"><em>{card.year}</em></div>
                <div className="movie-card__info__countries">
                    {card.countries?.map((country, index) => <em className="movie-card__info__country" key={index}>{country.name}</em>)}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;


