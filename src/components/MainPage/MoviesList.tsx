import React, { FC } from 'react'
import { IMovieCard } from '../../types/types';
import MovieCard from './MovieCard';

interface MoviesListProps {
    
}

const MoviesList: FC<MoviesListProps> = () => {
    return (
        <>
           hello guys
        </>
    )
}

export default MoviesList


{/* <List items={users} renderItem={(user: IUser) => <UserItem user={user} key={user.id}/>}/> */ }

// import React, { FC } from 'react'
// import { IMovieCard } from '../../types/types';
// import MovieCard from './MovieCard';

// interface MoviesListProps {
//     cards: IMovieCard[];
// }

// const MoviesList: FC<MoviesListProps> = ({ cards }) => {
//     return (
//         <>
//             {cards.map(card =>
//                 <MovieCard card={card} key={card.id} />
//             )}
//         </>
//     )
// }

// export default MoviesList