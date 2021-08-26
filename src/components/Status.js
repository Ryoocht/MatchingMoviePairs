// import { useContext, useEffect } from "react";
import "../style/record.css";
// import { RecordContext } from "../contexts/RecordContext";

const Status = () => {

    // const { AddRecord } = useContext(RecordContext);

    

    return (
        <div>
            <h1>User Name</h1>
            <table class="recordTable">
                <tbody>
                    <tr>
                        <th>Time</th>
                        <th>Attempts</th>
                        <th>Accuracy</th>
                    </tr>
                    <tr>
                        <td>XXXXX</td>
                        <td>XXXXX</td>
                        <td>XXXXX</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Status;