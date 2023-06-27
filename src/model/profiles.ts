import {collection, doc, setDoc, updateDoc, getDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../services/firebase";

export class Profiles {
    profilesRef;

    constructor() {
        this.profilesRef = collection(db, "profiles");
    }

    async setProfile(id: string, data: { full_name: string, type: string, }) {
        return await setDoc(doc(this.profilesRef, id), {
            full_name: data.full_name,
            type: data.type,
        }, {merge: true});
    }

    async setLoginDate(id: string) {
        return await setDoc(doc(this.profilesRef, id), {login_date: serverTimestamp()}, {merge: true});
    }

    async getProfile(id: string) {
        return await getDoc(doc(this.profilesRef, id));
    }
}