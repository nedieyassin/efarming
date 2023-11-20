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


export interface IChat {
    id: string,
    uid: string,
    type: string,
    title: string,
    farmer_name: string,
    advisor_name: string,
    date_created: string,
    farmer_id: string,
    advisor_id: string,
}


export interface IMessage {
    id: string,
    chat_id: string,
    user_id: string,
    user_name: string,
    body: string,
    date_created: string,
}