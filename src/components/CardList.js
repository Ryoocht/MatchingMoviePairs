import React from "react";
import Card from "../components/Card";

const CardList = ({movies}) => {
    let movie;
    for(let i = 0; i < 8; i++){
        movie = movies[i];
    }

    return(
        <div id="movie-collection">
            <Card movie={movie}/>
        </div>
    )
}

export default CardList;