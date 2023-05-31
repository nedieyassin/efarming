import {collection, doc, setDoc, orderBy, updateDoc, deleteDoc, getDocs, query} from "firebase/firestore";
import {db} from "../services/firebase";


export class Users {
    usersRef;

    constructor() {
        this.usersRef = collection(db, "profiles");
    }

    async updateUser(id: string, data: {
        type: string,
    }) {
        // console.log(data);
        return await setDoc(doc(this.usersRef, id), {
            type: data.type,
        }, {merge: true});
    }


    async deleteUser(id: string) {
        return await deleteDoc(doc(this.usersRef, id));
    }


    async getUsers() {
        const q = query(this.usersRef);
        const querySnapshot = await getDocs(q);
        const list: unknown | any = [];
        querySnapshot.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
        });
        return list;
    }
}