import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './[idMovie].module.css';
import axios from 'axios'; // Importez axios pour effectuer la requête

const MoviePage = () => {
  const router = useRouter();
  const [movie, setMovie] = useState();
  const { idMovie } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
        try {
            if (!idMovie) return; // Vérifiez si idMovie est undefined
            const response = await axios.get(`http://localhost:3000/api/movie/${idMovie}`);
            if (response.status === 200) {
                setMovie(response.data);
            } else {
                console.error('Error fetching movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching movie:', error);
        }
    };
    fetchMovie(); // Correction ici
  }, [idMovie]); // Correction ici

  useEffect(() => {
    if (movie) setLoading(false);
  }, [movie]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>{movie.movie.title}</title>
        <meta name="description" content={movie.movie.plot} />
      </Head>
      <div className={styles.container}>
        <h1>{movie.movie.title}</h1>
        <span>Description : </span><p className={styles.intro}>{movie.movie.plot}</p>
        <span>Genre : </span><p className={styles.intro}>{movie.movie.genres}</p>
        <span>Année : </span><p className={styles.intro}>{movie.movie.year}</p>
        <span>Pays : </span><p className={styles.intro}>{movie.movie.countries}</p>
        <span>Directors : </span><p className={styles.intro}>{movie.movie.directors}</p>
        <span>Note Tomatoes : </span><p className={styles.intro}>{movie.movie.tomatoes.viewer.rating}</p>
      </div>
      {/* Afficher d'autres détails du film ici */}
    </div>
  );
};

export default MoviePage;
