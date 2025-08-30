export interface User {
    name: string,
    lastname: string,
    email: string,
    role: string
}

export interface Project {
    id: number,
    name: string,
    date_init: string,
    date_end: string,
    state: string
}