import { useState, useContext, useEffect } from "react";
import "../style/record.css";
import { RecordContext } from "../contexts/RecordContext";
import RecordRow from "../components/RecordRow";

const RecordTable = () => {
    
    const { recordData } = useContext(RecordContext);
    const [data, setData] = useState([])

    useEffect(() => {
        setData(recordData)
    }, [recordData])

    const sortBtn = e => {
        let sortFilter = e.target.value;
        const newRecord = recordData.sort((a, b) => b[sortFilter] - a[sortFilter])
        setData([...newRecord])
    }

    return (
        <div>
            <table className="recordTable">
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Time <button className="triangleBtn" value="time" onClick={sortBtn}>▼</button></th>
                        <th>Attempts <button className="triangleBtn" value="attempts" onClick={sortBtn}>▼</button></th>
                        <th>Accuracy <button className="triangleBtn" value="accuracy" onClick={sortBtn}>▼</button></th>
                        <th>Total <button className="triangleBtn" value="total" onClick={sortBtn}>▼</button></th>
                    </tr>
                    {data.map((data, index)=> <RecordRow data={data} index={index}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default RecordTable;