import { useState, useContext, useEffect } from "react";
import "../style/record.css";
import { AuthContext } from "../contexts/AuthContext";
import { RecordContext } from "../contexts/RecordContext";
import StatusRow from "./StatusRow";

const Status = () => {
    
    const { recordData, getAllRecords } = useContext(RecordContext);
    const [data, setData] = useState([])

    useEffect(() => {
        setData(recordData)
    }, [recordData])

    const sortFnc = (sort="time") => {
        const newRecord = recordData.sort((a, b) => b["time"] - a["time"])
        setData([...newRecord])
        console.log("newRecord:", newRecord)
        console.log("data:", data)
    }
    
    // const callRenderFun = () => {
    //     return data.map((data, index)=> <StatusRow data={data} index={index}/>)
    // }

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
                    
                    {data.map((data, index)=> <StatusRow data={data} index={index}/>)}
                    {/* {callRenderFun()} */}
                </tbody>
            </table>
            <button onClick={sortFnc}>Sort button</button>
        </div>
    )
}

export default Status;