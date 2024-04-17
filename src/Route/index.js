import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from '../Container/Home';
import TvSeriesContainer from '../Container/TVSeries';
import DetailsContainer from '../Container/Details';
import MoviesContainer from '../Container/Movies';
import HeaderComponent from "../Components/Header";

const RouteComponent = () => {
    return (
        <>
            <BrowserRouter>
            <HeaderComponent />
                <Routes>
                    <Route path="/" element={<HomeContainer />} />
                    {/* Asegúrate de importar AboutContainer y definirlo */}           
                    <Route path="/movies" element={<MoviesContainer />} />
                    {/* Asegúrate de importar TvSeriesContainer y definirlo */}
                    <Route path="/series" element={<TvSeriesContainer />} />
                    <Route path="/details/:movieid/:mediatype" element={<DetailsContainer />} />
                    
                   
                    <Route path="/details/:movieid/:mediatype" />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouteComponent;
