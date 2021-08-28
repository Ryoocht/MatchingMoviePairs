import { useContext, useEffect } from "react";
import "../style/record.css";
import { AuthContext } from "../contexts/AuthContext";
import { RecordContext } from "../contexts/RecordContext";
import StatusRow from "./StatusRow";

const Status = () => {

    const { currentUser } = useContext(AuthContext);
    const { newRecord, recordData, setRecordData, getAllRecords } = useContext(RecordContext);

    useEffect(() => {
        getAllRecords(currentUser);
        setRecordData([
            ...recordData,
            newRecord
        ])
    }, [newRecord])

    return (
        <div>
            <h1>User Name</h1>
            <table className="recordTable">
                <tbody>
                    <tr>
                        <th>Time</th>
                        <th>Attempts</th>
                        <th>Accuracy</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                    {recordData.map(data => <StatusRow data={data}/>)}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Status;