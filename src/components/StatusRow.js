import "../style/record.css";

const StatusRow = props => {
    let count= 1;
    let ranking
    for(let i = 0; i < props.length; i++){
        count += i;
        if(i === 1){
            ranking = "gold";
        } else if(i === 2){
            ranking = "silver";
        } else if(i === 3) {
            ranking = "blonze";
        } else {
            ranking = "ranking";
        }
    }

    return(
        <>
            <td className={ranking}>{count}</td>
            <td>{props.data.time}</td>
            <td>{props.data.attempts}</td>
            <td>{props.data.accuracy}</td>
            <td>{props.data.total}</td>
        </>
    )
}

export default StatusRow;