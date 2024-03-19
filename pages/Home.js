import React, { useState, useEffect } from 'react';
import MovieCard from '../pages/components/MovieCard'; // Assurez-vous d'importer le composant MovieCard
import styles from './Home.module.css'; // Créez ce fichier CSS pour styliser votre carte de film


const MovieGallery = () => {
  const [movies, setMovies] = useState([]);

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

  return (
    <div className={styles.container}>
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGallery;
