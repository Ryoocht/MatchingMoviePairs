import React from "react";
import "../style/Img.css";

const Card = props => {
    let cardStyle = 'card card-back';
    let numStyle = 'front';
    switch(props.matchStatus){
        case 1:
            numStyle = 'back';
            break;
        case 2:
            numStyle = "back matched";
            break;
        case 3:
            numStyle = "back unmached";
            break;
        default:
            cardStyle = 'card card-front';
            break;
    }

    const handleClick = () => {
        props.checkMatch(props.value, props.id);
    }
    
    return (
        <button className={cardStyle} onClick={handleClick}>
            <div className={numStyle}><img className="imgStyle" src={`https://image.tmdb.org/t/p/original/${props.value}`} alt="movie"></img></div>
        </button>
    );
}

export default Card;