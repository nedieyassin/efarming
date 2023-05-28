import {collection, doc, setDoc, orderBy, getDoc, deleteDoc, getDocs, where, or, query} from "firebase/firestore";
import {db} from "../services/firebase";


export class Chats {
    chatsRef;

    constructor() {
        this.chatsRef = collection(db, "chats");
    }

    async setChat(id: string, data: {
        user_id: string,
        title: string,
        type: string,
        farmer_name: string,
        date_created: any
    }) {
        return await setDoc(doc(this.chatsRef, id), {
            user_id: data.user_id,
            title: data.title,
            type: data.type,
            farmer_name: data.farmer_name,
            date_created: data.date_created
        });
    }

    async ownChat(id: string, data: {
        advisor: string,
        advisor_name: string,

    }) {
        return await setDoc(doc(this.chatsRef, id), {
            advisor: data.advisor,
            advisor_name: data.advisor_name,

        }, {merge: true});
    }

    async getChat(id: string) {
        return await getDoc(doc(this.chatsRef, id));
    }

    getChatMessages(id: string) {
        // collection(doc(collection(db, "chats"), id), "messages");
        return query(collection(doc(this.chatsRef, id), 'messages'), orderBy("date_created", 'asc'));
    }

    async setChatMessage(id: string, data: {
        from: string,
        text: string,
        date_created: any
    }) {
        return await setDoc(doc(collection(doc(this.chatsRef, id), 'messages')), {
            from: data.from,
            text: data.text,
            date_created: data.date_created
        });
    }

    async deleteChat(id: string) {
        return await deleteDoc(doc(this.chatsRef, id));
    }


    async getChats(user_id: string) {
        const q = query(this.chatsRef, where('user_id', '==', user_id), orderBy("date_created", 'desc'));
        const querySnapshot = await getDocs(q);
        const list: unknown | any = [];
        querySnapshot.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
        });
        return list;
    }

    async getAdvChats(user_id: string) {
        const q = query(this.chatsRef, where('advisor', '==', user_id), orderBy("date_created", 'desc'));
        const querySnapshot = await getDocs(q);
        const list: unknown | any = [];
        querySnapshot.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
        });
        return list;
    }

    async getNewChats() {
        const q = query(this.chatsRef, where('advisor', '==', ''), orderBy("date_created", 'desc'));
        const querySnapshot = await getDocs(q);
        const list: unknown | any = [];
        querySnapshot.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
        });
        return list;
    }
}