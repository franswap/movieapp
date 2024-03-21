import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './MovieCard.module.css'; // Créez ce fichier CSS pour styliser votre carte de film


const MovieCard = ({ movie }) => {
    const router = useRouter();
  
    const handleMovieClick = () => {
      router.push(`/movie/${movie._id}`); // Naviguer vers la page du film avec l'ID spécifié
    };

  return (
    <div className={styles.movieCard} onClick={handleMovieClick}>
      <div className={styles.movieImage}>
        <Image src={movie.poster} alt={movie.title} width={200} height={300} />
      </div>
      <div className={styles.movieInfo}>
        <h3>{movie.title}</h3>
        <p>{movie.director}</p>
        <p>{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
