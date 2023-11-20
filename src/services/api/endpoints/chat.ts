import service from '../service';
import {IChat, IMessage} from '../../../types/auth';

export class Chats {
    public add(form: Partial<IChat>) {
        return service.post('/chats').send(form);
    }

    public addMessage(form: Partial<IMessage>) {
        return service.post('/chats/messages').send(form);
    }

    public advisorTakeQuery(id: string, form: { advisor_name: string, advisor_id: string }) {
        return service.put('/chats/advisor-take-query/' + id).send(form);
    }

    public getMessages(id: string) {
        return service.get('/chats/messages/' + id).set('Authorization', `Bearer `);
    }

    public get(uid: string) {
        return service.get('/chats/' + uid).set('Authorization', `Bearer `);
    }

    public getPersonChats(id: string) {
        return service.get('/chats/person/' + id).set('Authorization', `Bearer `);
    }

    public getAdvisorChats(id: string) {
        return service.get('/chats/advisor/' + id).set('Authorization', `Bearer `);
    }

    public delete(uid: string) {
        return service.delete('/chats/' + uid).set('Authorization', `Bearer `);
    }

    public getList() {
        return service.get('/chats').set('Authorization', `Bearer `);
    }

}
