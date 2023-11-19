import service from '../service';
import {IAuth} from '../../../types/auth';

export class Auth {
    public register(form: IAuth) {
        return service.post('/auth/register').send(form);
    }

    public login(form: IAuth) {
        return service.post('/auth/login').send(form);
    }

    public updateName(form: { id: string, full_name: string }) {
        return service.put('/auth/update-name/' + form.id).send(form);
    }

    public getProfile(id: string) {
        return service.get('/auth/profile/' + id).set('Authorization', `Bearer `);
    }

}
