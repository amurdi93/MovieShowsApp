import  React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CardMoviesComponents from '../../Components/CardMovies';




const  MoviesContainer = ()=>{
    const [content, setContent] = useState([]);

    
    useEffect(() => {
        console.log('HomeContainer Component did mount');

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTNmMGY5NmEzOTRlOWNhODY2NGU5NmQ5YzMyNjE4MyIsInN1YiI6IjYzNWFjNTNiMDAyMTM0MDA3ZGRkMTY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oCX3c7-GAF4TvLYj7h__pzIecpwRrM5tLJvQl0NtxGU'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setContent(data.results);
                console.log('data', data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);
    return (
        <main className='homePage'>
            <Container>
                <Row>
                    <Col className='col-12'>
                        <section>
                            <h1 className='txtCenter'>Top Trending Movies</h1>
                            <h3 className='txtCenter'> For You</h3>
                        </section>
                    </Col>
                </Row>
                <Row>
                   
                    <Col className='col-10'>
                        <Row>
                                {
                                    content && content.length > 0 ? content.map((item, index)=>{
                                        return (<CardMoviesComponents key={index} data={item} mediaType="movie"/>)
                                    }) : 'Loading ....'
                                }


                        </Row>
                    </Col>
                    
                </Row>
            </Container>
        </main>
    )
}

export default MoviesContainer;