export interface User {
    id?: number
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

export interface Tasks {
    id: number,
    name: string,
    state: string,
    priority: string,
    employee: string,
    project: string,
    id_employee: number,
    id_project: number
}

export interface Resource {
    id:number,
    name:string,
    project_name:string,    
}