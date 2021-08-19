import React from "react";
import "../style/Img.css";

const Card = props => {
    let backCard = "card card-front";
    let frontCard = "back";
    switch(props.matchStatus){
        case 1:
            frontCard = "front";
            break;
        case 2: 
            frontCard = "front match";
            break;
        case 3:
            frontCard = "front unmatch";
            break;
        default:
            backCard = "card card-back";
            break;
    }

    const handleClick = () => {
        props.checkMatch(props.value, props.id);
    }
    
    return(
        <button className={backCard} onClick={handleClick}>
            <img className={frontCard} src={`https://image.tmdb.org/t/p/original/${props.value}`} alt="movie"></img>
        </button>
    )
}

export default Card;