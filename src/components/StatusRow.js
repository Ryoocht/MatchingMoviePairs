const StatusRow = props => {
    return(
        <>
            <td>{props.data.time}</td>
            <td>{props.data.attempts}</td>
            <td>{props.data.accuracy}</td>
            <td>{props.data.total}</td>
        </>
    )
}

export default StatusRow;