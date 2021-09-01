import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase/Firebase";
import { AuthContext } from "./AuthContext";

const RecordContext = createContext();

const RecordProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [ recordData, setRecordData ] = useState([]);

    const addNewRecord = (time, attempt, accuracy, totals, user) => {
        db.collection("users").doc(user.uid).collection("recordData").add({
            time: time,
            attempts: attempt,
            accuracy: accuracy,
            total: totals
        })
    }

    const getAllRecords = async user => {
        if(user){
            const recordCollection = await db.collection("users").doc(user.uid).collection("recordData").get();
            const collection = []
            recordCollection.forEach(async record => {
                const data = await record.data()
                collection.push(data)
                collection.sort((a,b) => b["total"] - a["total"])
            });
            setRecordData(collection)
        }
    }

    useEffect(() => {
        getAllRecords(currentUser);
    }, [currentUser])

    return(
        <RecordContext.Provider value={{ recordData, addNewRecord, getAllRecords }} >
            {children}
        </RecordContext.Provider>
    )
}

export { RecordContext, RecordProvider };