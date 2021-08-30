import { createContext, useState } from "react";
import { db } from "../firebase/Firebase";

const RecordContext = createContext();

const RecordProvider = ({ children }) => {

    const [ newRecord, setNewRecord ] = useState([]);
    const [ recordData, setRecordData ] = useState([]);

    const addNewRecord = (time, attempt, accuracy, totals, user) => {
        db.collection("users").doc(user.uid).collection("recordData").add({
            time: time,
            attempts: attempt,
            accuracy: accuracy,
            total: totals
        })
        .then(() => {
            setNewRecord({
            time: time,
            attempts: attempt,
            accuracy: accuracy,
            total: totals
            });
        })
    }

    const getAllRecords = async user => {
        if(user){
            const recordCollection = await db.collection("users").doc(user.uid).collection("recordData").get();
            recordCollection.forEach(record => {
                setRecordData(
                    [...recordData, {...record.data()}]
                )
                // console.log(record.data())
            });
            // console.log(recordData)
        }
    }

    return(
        <RecordContext.Provider value={{ newRecord, recordData, addNewRecord, getAllRecords }} >
            {children}
        </RecordContext.Provider>
    )
}

export { RecordContext, RecordProvider };