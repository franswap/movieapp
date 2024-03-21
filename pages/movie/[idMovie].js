import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
      <h1>{movie.movie.title}</h1>
      <p>{movie.movie.plot}</p>
      {/* Afficher d'autres détails du film ici */}
    </div>
  );
};

export default MoviePage;
