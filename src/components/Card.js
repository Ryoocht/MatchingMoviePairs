import React from "react";
import "../style/Img.css";

const Card = props => {
    let cardStyle;
    let imgDisplay;
    switch(props.matchStatus){
        case 1:
            cardStyle = "card front";
            imgDisplay = "front-display";
            break;
        case 2: 
            cardStyle = "card front match";
            imgDisplay = "front-display";
            break;
        case 3:
            cardStyle = "card front unmatch";
            imgDisplay = "front-display";
            break;
        default:
            cardStyle = "card back";
            imgDisplay = "back-display";
            break;
    }

    const handleClick = () => {
        props.checkMatch(props.value, props.id);
    }
    
    return(
        <button className={cardStyle} onClick={handleClick}>
            <img className={imgDisplay === "back-display" ? "imgBackStyle back-display" : "imgFrontStyle front-display"} src={`https://image.tmdb.org/t/p/original/${props.value}`} alt="movie"></img>
        </button>
    )
}

export default Card;