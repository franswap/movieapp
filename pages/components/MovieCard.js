import React from 'react';
import Image from 'next/image';
import styles from './MovieCard.module.css'; // Créez ce fichier CSS pour styliser votre carte de film

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.movieCard}>
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
