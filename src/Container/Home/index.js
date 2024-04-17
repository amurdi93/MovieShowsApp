import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardMoviesComponents from '../../Components/CardMovies';




const HomeContainer = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);

    useEffect(() => {
        console.log('HomeContainer Component did mount');

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTNmMGY5NmEzOTRlOWNhODY2NGU5NmQ5YzMyNjE4MyIsInN1YiI6IjYzNWFjNTNiMDAyMTM0MDA3ZGRkMTY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oCX3c7-GAF4TvLYj7h__pzIecpwRrM5tLJvQl0NtxGU'
            }
        };

        // Fetch popular movies
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                console.log('Movies data', data);
            })
            .catch(error => {
                console.error('Error fetching movies data:', error);
            });

        // Fetch popular TV shows
        fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => {
                setTvShows(data.results);
                console.log('TV shows data', data);
            })
            .catch(error => {
                console.error('Error fetching TV shows data:', error);
            });

    }, []);

    return (
        <main className='homePage'>
            <Container>
                <Row>
                    <Col className='col-12'>
                        <section>
                            <h1 className='txtCenter'>Top Trending </h1>
                            <h3 className='txtCenter'>Tv and Movie For You</h3>
                        </section>
                    </Col>
                    {/* Render popular movies */}
                    {movies.map((movie, index) => (
                         <CardMoviesComponents key={index} data={movie} mediaType="movie" />
                    ))}
                    {/* Render popular TV shows */}
                    {tvShows.map((tvShow, index) => (
                         <CardMoviesComponents key={index} data={tvShow} mediaType="tv" />

                    ))}
                </Row>
            </Container>
        </main>
    )
}

export default HomeContainer;
