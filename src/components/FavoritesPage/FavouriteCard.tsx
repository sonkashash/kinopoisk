import React, { FC } from 'react'
import { IMovieCard } from '../../types/types';
import '../../styles/FavoritesPage/FavoriteCard.css';
import '../../styles/MainPage/MovieCard.css';
import plugPosterPath from '../../assets/plug-poster.png';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface FavoriteCardProps {
    card: IMovieCard;
    onDelete: (id: number) => void;  // Добавляем prop onDelete для обработки удаления
}

const FavoriteCard: FC<FavoriteCardProps> = ({ card, onDelete }) => {
    return (
        <div className="favorite-card">
            <div className="favorite-card__poster">
                <img src={card.poster?.url ?? plugPosterPath} alt={card.name} />
            </div>
            <h3 className="favorite-card__name">{card.name ?? card.alternativeName ?? 'Нет названия'}</h3>
            <div className="favorite-card__info">
                <p className="favorite-card__info__year">{card.year}</p>
                <div className="favorite-card__info__genres">
                    {card.genres?.map((genre) => (
                        <span className="favorite-card__info__genre" key={genre.name}>{genre.name}</span>
                    ))}
                </div>
            </div>
            <p className="favorite-card__description">{card.description ?? 'Описание отсутствует'}</p>
            <button className="favorite-card__delete-btn" onClick={(e) => { e.preventDefault(); onDelete(card.id) }} color="secondary" >
                <DeleteIcon />
            </button>
        </div>
    )
}

export default FavoriteCard;
