export interface IProfile {
    full_name: string,
    type: string,
    user_id: string,
    email_address: string,
    access: string
}

export interface IAuth {
    email_address: string,
    password: string
}


export interface IQuickhelp {
    uid: string,
    type: string,
    title: string,
    body: string,
    date_updated: string,
}