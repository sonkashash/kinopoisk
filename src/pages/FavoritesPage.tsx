import React from 'react';
import { IMovieCard } from '../types/types';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../styles/FavoritesPage/FavoritesPage.css';
import FavoriteCard from '../components/FavoritesPage/FavouriteCard';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = React.useState<IMovieCard[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const handleDeleteAllFavorites = () => {
    localStorage.removeItem('favorites');
    setFavorites([]);
  };

  const handleDeleteFavorite = (id: number) => {
   
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

  };

  return (
    <div className='favorites-page'>
      <h1 className='favorites-title'>Сохраненные фильмы</h1>
      <>
        {!favorites.length ? (
          <p>У вас нет избранных фильмов.</p>
        ) : (
          <>
            <Button sx={{ mb: 2 }} variant="contained" color="secondary" onClick={handleDeleteAllFavorites}>
              Удалить всe
            </Button>
            <div className="favorites-container">
              {favorites.map((card) => (
                <div key={card.id}>
                  <Link to={`/movie/${card.id}`} style={{ textDecoration: 'none' }}>
                    <FavoriteCard card={card} onDelete={handleDeleteFavorite} />
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default FavoritesPage;
