import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './details.css';
import { img_300, img_not_available } from '../../Config';

const DetailsContainer = () => {
    const params = useParams();
    const [content, setContent] = useState(null);
    const [similarContent, setSimilarContent] = useState([]);

    const titleName = content?.name || content?.title || '';
    const id = params.movieid || '';
    const _media_type = (params && params.mediatype) ? params.mediatype.toLowerCase() : '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTNmMGY5NmEzOTRlOWNhODY2NGU5NmQ5YzMyNjE4MyIsInN1YiI6IjYzNWFjNTNiMDAyMTM0MDA3ZGRkMTY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oCX3c7-GAF4TvLYj7h__pzIecpwRrM5tLJvQl0NtxGU'
                    }
                };

                // URL for movies or TV shows
                const url = _media_type === 'movie' ? `https://api.themoviedb.org/3/movie/${id}?language=en-US&page=1` : `https://api.themoviedb.org/3/tv/${id}?language=en-US&page=1`;

                const response = await fetch(url, options);
                const data = await response.json();
                setContent(data);

                // Fetch similar content
                const similarUrl = _media_type === 'movie' ? `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1` : `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`;
                const similarResponse = await fetch(similarUrl, options);
                const similarData = await similarResponse.json();
                setSimilarContent(similarData.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id, _media_type]);

    const renderSimilarContent = () => {
        return (
            <Row>
                <Col className='col-12'>
                    <h2>Similar { _media_type === 'movie' ? 'Movies' : 'TV Shows' }</h2>
                </Col>
                {similarContent.map((item, index) => (
                    <Col key={index} className='col-12 col-sm-6 col-md-4 col-lg-3'>
                        <div>
                            <img src={`${img_300}${item.poster_path}`} alt={item.title || item.name} />
                            <p>{item.title || item.name}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        );
    };

    return (
        <main className='detailsPage'>
            <Container>
                {content && (
                    <>
                        <Row>
                            <Col className='col-12'>
                                <h1>
                                    {titleName}
                                </h1>
                            </Col>
                            <Col className='col-12 col-xl-6'>
                                <div className='card card--details'>
                                    <div className='card__cover'>
                                        <img src={content.poster_path ? `${img_300}${content.poster_path}` : img_not_available} alt="Cover" />
                                    </div>
                                    <div className='card__content'>
                                        <div className="card__wrap">
                                            <span className="card__rate">{content.vote_average}</span>
                                        </div>
                                        <ul className="card__meta">
                                            <li>
                                                <span>Type:</span>
                                                <span className='linkTag'>{_media_type}</span>
                                            </li>
                                            <li>
                                                <span>Release year:</span>
                                                <span className='linkTag'>{content.first_air_date || content.release_date}</span>
                                            </li>
                                        </ul>
                                        <div className="description_readmore_wrapper">
                                            {content.overview}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {similarContent.length > 0 && renderSimilarContent()}
                    </>
                )}
            </Container>
        </main>
    );
};

export default DetailsContainer;
