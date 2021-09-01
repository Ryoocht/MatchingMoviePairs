import "../style/record.css";

const StatusRow = props => {
    let rankClass;
    switch(props.index + 1){
        case 1: 
            rankClass = "gold";
            break;
        case 2:
            rankClass = "silver";
            break;
        case 3:
            rankClass = "bronze";
            break;
        default: 
            rankClass = "others";
            break;
    }

    return(
        <tr className={rankClass}>
            <td>{props.index + 1}</td>
            <td>{props.data.time}</td>
            <td>{props.data.attempts}</td>
            <td>{props.data.accuracy}</td>
            <td>{props.data.total}</td>
        </tr>
    )
}

export default StatusRow;