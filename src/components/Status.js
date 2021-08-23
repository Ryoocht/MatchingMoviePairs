import React from "react";
import "../style/record.css";

const Status = record => {
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