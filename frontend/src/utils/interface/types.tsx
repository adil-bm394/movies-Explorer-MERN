export interface Movie {
  _id: string;
  imdbID: string;
  Title: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  BoxOffice: string;
  comments: { userId: string; userName: string; comment: string }[];
  ratings: { userId: string; userName: string; rating: number }[];
}

export interface SimplifiedMovie {
  Title: string;
  Poster: string;
  Year: string;
  imdbRating: string;
  Genre: string;
  imdbID: string;
}

export interface RegisterFormInputs {
  id?: string; 
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface CommentFormInputs {
  comment: string;
}

export interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}
export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface Comment {
  userId: string;
  userName: string;
  comment: string;
}
export interface RatingComponentProps {
  isLoggedIn: boolean;
  initialRating: number | null;
  movieId: string;
  userId: string;
  userName: string;
  handleRatingClick: (value: number) => void;
}

export interface FavoritesState {
  favorites: SimplifiedMovie[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  isLoggedIn: boolean;
  userDetails: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    token: string;
  } | null;
}
