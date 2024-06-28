export interface Informacion {
    _id: number;
    titulo?: string;
    descripcion?: string;
    created?: string;
    logo?: string;
    estado?: string;
}

export interface RootObject {
    total: number;
    data: Informacion[];
    pageNumber: number;
    pageSize: number;
}

