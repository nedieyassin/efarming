import {collection, doc, setDoc, orderBy, getDoc, deleteDoc, getDocs, query} from "firebase/firestore";
import {db} from "../services/firebase";


export class Quickhelp {
    quickhelpsRef;

    constructor() {
        this.quickhelpsRef = collection(db, "quickhelps");
    }

    async setQuickHelp(id: string, data: {
        title: string,
        type: string,
        body: string,
        date_updated: any
    }) {
        return await setDoc(doc(this.quickhelpsRef, id), {
            title: data.title,
            type: data.type,
            body: data.body,
            date_updated: data.date_updated
        });
    }

    async getQuickHelp(id: string) {
        return await getDoc(doc(this.quickhelpsRef, id));
    }

    async deleteQuickHelp(id: string) {
        return await deleteDoc(doc(this.quickhelpsRef, id));
    }


    async getQuickHelps() {
        const q = query(this.quickhelpsRef, orderBy("date_updated", 'desc'));
        const querySnapshot = await getDocs(q);
        const list: unknown | any = [];
        querySnapshot.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
        });
        return list;
    }
}