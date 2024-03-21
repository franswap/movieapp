import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Importer le hook useRouter
import MovieCard from '../pages/components/MovieCard';
import styles from './Home.module.css';

const MovieGallery = () => {
  const [movies, setMovies] = useState([]);
  const router = useRouter(); // Initialiser le hook useRouter

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (response.ok) {
          const data = await response.json();
          setMovies(data.data);
        } else {
          console.error('Error fetching movies:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Fonction pour gérer la navigation vers la page du film
  const handleMovieClick = (id) => {
    router.push(`/movie/${id}`); // Naviguer vers la page du film avec l'ID spécifié
  };

  return (
    <div className={styles.container}>
      <h1>MovieApp</h1>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onClick={() => handleMovieClick(movie._id)} // Passer la fonction de gestion du clic
        />
      ))}
    </div>
  );
};

export default MovieGallery;
