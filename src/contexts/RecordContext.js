import { createContext, useState } from "react";
import { db } from "../firebase/Firebase";

const RecordContext = createContext();

const RecordProvider = ({ children }) => {

    const [ recordData, setRecordData ] = useState([]);

    const addNewRecord = (time, attempt, accuracy, totals, user) => {
        db.collection("users").doc(user.uid).collection("recordData").add({
            time: time,
            attempts: attempt,
            accuracy: accuracy,
            total: totals
        })
        .then(() => {
            setRecordData({
            time: time,
            attempts: attempt,
            accuracy: accuracy,
            total: totals
            });
            console.log("setRecordData")
        })
    }

    return(
        <RecordContext.Provider value={{ addNewRecord }} >
            {children}
        </RecordContext.Provider>
    )
}

export { RecordContext, RecordProvider };