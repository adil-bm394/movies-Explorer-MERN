import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/slices/moviesSlice";
import { RootState, AppDispatch } from "../redux/store";

const useFetchMovies = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return { movies, loading, error };
};

export default useFetchMovies;
