
export type GrantedAuthority = {authority:string}

export class ResponseLogin {

    token?:string
    user?: string
    role?: string
    id?: string
    codUsuario?: number
    nombre?: string
    email?: string
    tipo?: string
    authorities?: GrantedAuthority[]

}
