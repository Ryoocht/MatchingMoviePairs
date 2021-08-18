import React from "react";
import "../style/Img.css";

const Card = props => {
    let cardStyle = "card card-back";
    let numStyle = "front";
    switch(props.ready){
        case 1:
            numStyle = "back";
            break;
        case 2:
            numStyle = "back matched";
            break;
        case 3:
            numStyle = "back unmatched";
            break;
        default:
            cardStyle = "card card-front";
            break;
    }

    return (
        <button className={cardStyle} onClick={props.onClick}>
            <div className={numStyle}><img src={`https://image.tmdb.org/t/p/original/${props.number}`} alt="movie"></img></div>
        </button>
    )
}

export default Card;