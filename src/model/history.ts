import {collection, doc, setDoc, orderBy, getDoc, deleteDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../services/firebase";


export class History {
    historyRef;

    constructor() {
        this.historyRef = collection(db, "history");
    }

    async set(id: string) {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const m = new Date().getMonth()
        const y = new Date().getFullYear()

        return await setDoc(doc(this.historyRef, id), {
            month: month[m],
            year: y,
        });
    }

    async get() {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const q = query(this.historyRef, where('year', '==', new Date().getFullYear()));
        const querySnapshot = await getDocs(q);
        const list: unknown | any = [];
        querySnapshot.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
        });

        const series: number[] = [];

        month.forEach((m) => {
            series.push((list.filter((l: { month: string }) => l.month === m).length as number));
        })


        return series;
    }
}