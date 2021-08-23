import { db } from "./Firebase";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import Status from "../components/Status";

const AddNewUser = currentUser => {
    db.collection("users").doc(currentUser.uid).collection("records").add({
        attempts: 0,
        accuracy: 0,
        time: 0
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
            console.error("Error adding document: ", error);
        })
}

const AddNewRecord = record => {
    const currentUser = useContext(AuthContext);
    db.collection("users").doc(currentUser.uid).collection("records").add({
        attempts: record.attempts,
        accuracy: record.accuracy,
        time: record.time
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
            console.error("Error adding document: ", error);
        })

    return (
        <Status record={record}/>
    )
}

export { AddNewUser, AddNewRecord }