// import { createContext, useState } from "react";
// import { db } from "../firebase/Firebase";

// const RecordContext = createContext();

// const RecordContextProvider = ({ children }) => {

//     const [ recordData, setRecordData ] = useState([]);
//     const [ timeRecord, setTimeRecord ] = useState("");
//     const [ attemptRecord, setAttemptRecord ] = useState("");
//     const [ accuracyRecord, setAccuracyRecord ] = useState("");

//     const getAllRecord = (record) => {
//         console.log(record)
//     }

//     const AddRecord = (time, attempt, accuracy) => {
//         db.collection("users").doc("records").set({
//             time,
//             attempt,
//             accuracy
//         })
//         .then(resp => {
//             setRecordData([
//                 ...recordData, {
//                     time: timeRecord,
//                     attempt: attemptRecord,
//                     accuracy: accuracyRecord,
//                 }
//             ]);
//         });
//     }

//     return(
//         <RecordContext.Provider value={ getAllRecord } >
//             {children}
//         </RecordContext.Provider>
//     )
// }

// export { RecordContext, RecordContextProvider };