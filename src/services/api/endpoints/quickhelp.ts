import service from '../service';
import {IAuth, IQuickhelp} from '../../../types/auth';

export class Quickhelp {
    public updateAdd(form: IQuickhelp) {
        return service.post('/quick-help').send(form);
    }

    public get(uid: string) {
        return service.get('/quick-help/' + uid).set('Authorization', `Bearer `);
    }

    public delete(uid: string) {
        return service.delete('/quick-help/' + uid).set('Authorization', `Bearer `);
    }

    public getList() {
        return service.get('/quick-help').set('Authorization', `Bearer `);
    }

}
