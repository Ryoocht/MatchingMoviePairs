import { useContext, useEffect } from "react";
import "../style/record.css";
import { AuthContext } from "../contexts/AuthContext";
import { RecordContext } from "../contexts/RecordContext";
import StatusRow from "./StatusRow";

const Status = () => {

    const { currentUser } = useContext(AuthContext);
    const { newRecord, recordData, getAllRecords } = useContext(RecordContext);

    useEffect(() => {
        getAllRecords(currentUser);
    }, [])

    return (
        <div>
            <table className="recordTable">
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Time</th>
                        <th>Attempts</th>
                        <th>Accuracy</th>
                        <th>Total</th>
                    </tr>
                    <>
                    {recordData.map(data => <StatusRow data={data}/>)}
                    </>
                </tbody>
            </table>
        </div>
    )
}

export default Status;