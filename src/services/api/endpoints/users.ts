import service from '../service';
import {IQuickhelp} from '../../../types/auth';

export class Users {


    public get() {
        return service.get('/auth/users').set('Authorization', `Bearer `);
    }

    public delete(uid: string) {
        return service.delete('/auth/users/' + uid).set('Authorization', `Bearer `);
    }

    public changeRole(uid: string, role: string) {
        return service.put('/auth/users/change-role/' + uid).send({role}).set('Authorization', `Bearer `);
    }

    public getList() {
        return service.get('/quick-help').set('Authorization', `Bearer `);
    }

}
