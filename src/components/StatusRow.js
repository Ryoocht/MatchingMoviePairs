import "../style/record.css";

const StatusRow = props => {
    const rank = {1: "gold", 2: "silver", 3: "bronze", 4: "white"}
    

    return(
        <tr className={rank[props.index]}>
            <td>{props.index + 1}</td>
            <td>{props.data.time}</td>
            <td>{props.data.attempts}</td>
            <td>{props.data.accuracy}</td>
            <td>{props.data.total}</td>
        </tr>
    )
}

export default StatusRow;