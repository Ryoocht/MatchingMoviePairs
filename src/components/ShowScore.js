import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { RecordContext } from "../contexts/RecordContext";
 
const ShowScore = (props) => {

    const { currentUser } = useContext(AuthContext);
    const { addNewRecord } = useContext(RecordContext);
    const [ totals, setTotals] = useState(null);

    const totalScore = () => {
        const time = props.time;
        const attempts = props.attempts;
        const accuracy = props.accuracy;
        let calculatedTime = 0;
        let calculatedAttempts = 0;
        let calculatedAccuracy = 0;
        
        if(time <= 100 && time >= 70){
            calculatedTime = time * 2;
        } else if(time < 70 && time >= 40){
            calculatedTime = time * 1.5;
        } else {
            calculatedTime = time * 1.25;
        }

        if(attempts >= 10 && attempts <= 13){
            calculatedAttempts = attempts * 2.75;
        } else if(attempts > 13 && attempts <= 17){
            calculatedAttempts = attempts * 1.75;
        } else {
            calculatedAttempts = attempts * 1.25;
        }

        if(accuracy >= 65){
            calculatedAccuracy = accuracy * 2.5;
        } else if(accuracy < 65 && accuracy >= 40){
            calculatedAccuracy = accuracy * 2;
        } else {
            calculatedAccuracy = accuracy * 1.5;
        }
        const totalScore = Math.ceil(calculatedTime + calculatedAttempts + calculatedAccuracy)
        return totalScore;
    }

    const windowReload = () => {
        window.location.reload();
    }

    useEffect(() => {
        setTotals(totalScore);
        if(totals !== null && currentUser){
            addNewRecord(props.time, props.attempts, props.accuracy, totals, currentUser);
        }
    }, [totals])
                
    return(
        <div className="scoreContainer">
            <p className="scoreTitle">{props.title}</p>
            <p className="score"><span className="scoreDetail" id="timeColor">TIME</span><span className="scoreNumber">{props.time}/100</span></p>
            <p className="score"><span className="scoreDetail" id="attemptColor">ATTEMPTS</span><span className="scoreNumber">{props.attempts}/10 min</span></p>
            <p className="score"><span className="scoreDetail" id="accuracyColor">ACCURACY</span><span className="scoreNumber">{props.accuracy}%/100%</span></p>
            <hr/>
            <p className="score"><span className="scoreDetail">TOTAL</span><span className="scoreNumber">{totalScore()}pt</span></p>
            <button className="playAgain" onClick={windowReload}>Play Again</button>
            <button className="scores"><Link to="/status" className="scoreLink">Scores</Link></button>
        </div>
    )
}

export default ShowScore;