import service from '../service';
import {IBotStep} from '../../../types/auth';

export class Bot {
    public add(form: Partial<IBotStep>) {
        return service.post('/bot').send(form);
    }


    public update(form: Partial<IBotStep>) {
        return service.put('/bot/' + form.id).send(form);
    }


    public getChildren(id: string) {
        return service.get('/bot/children/' + id).set('Authorization', `Bearer `);
    }

    public getParents() {
        return service.get('/bot/parents').set('Authorization', `Bearer `);
    }

    public delete(uid: string) {
        return service.delete('/bot/' + uid).set('Authorization', `Bearer `);
    }

}
