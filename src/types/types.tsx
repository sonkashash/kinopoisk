export interface IPoster {
    url: string;
}

export interface IRating {
    kp: number;
    imdb: number;
}
export interface ICountry{
    name: string;
}

export interface IGenre{
    name: string;
}

export interface IMovieCard{
    id: number;
    name: string;
    year:number;
    rating: IRating;
    poster: IPoster;
    countries: ICountry[];
    genres: IGenre[];
    description?: string;
    alternativeName?: string;
}

export interface IFilters {
    [key: string]: boolean;
  }


