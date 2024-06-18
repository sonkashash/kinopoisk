import React, { FC } from 'react'
import { IMovieCard } from '../../types/types'
import '../../styles/MainPage/MovieCard.css'
import plugPosterPath from '../../assets/plug-poster.png'

interface MovieCardProps {
    card: IMovieCard;
}

const MovieCard: FC<MovieCardProps> = ({ card }) => {

    return (
        <div className="movie-card">
            <div className="movie-card__poster">
                <img src={card.poster?.url ?? plugPosterPath} alt={card.name} />
            </div>
            <div className={Number(card.rating.kp || card.rating.imdb) >= 8 ? "movie-card__rating green" : "movie-card__rating grey"}>
                {Math.round(Number(card.rating.kp || card.rating.imdb) * 100) / 100}
            </div>
            <h3 className={card.name ? "movie-card__name" : "movie-card__name text-red"}>{card.name ?? card.alternativeName ?? 'Нет названия'}</h3>
            <div className="movie-card__info">
                <div className="movie-card__info__year"><em>{card.year}</em></div>
                <div className="movie-card__info__countries">
                    {card.countries?.map((country, index) => <em className="movie-card__info__country" key={index}>{country.name}</em>)}
                </div>
            </div>
        </div>
    )
}

export default MovieCard