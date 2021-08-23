import { db } from "./Firebase";

const AddNewUser = currentUser => {
    db.collection("users").doc(currentUser.uid).collection("records").add({
        attempts: 0,
        accuracy: 0
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
            console.error("Error adding document: ", error);
        })
}

export { AddNewUser }