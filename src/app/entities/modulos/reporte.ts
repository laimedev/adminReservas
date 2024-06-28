export interface Reporte {
    _id: number;
    trabajo?: string;
    fecha_desde?: string;
    fecha_hasta?: string;
    fecha_fin?: string;
    horas?: number;
    observacion?: string;
    proyectoNombre?: string;
    proyectoID?: number;
    presupuesto?: number;
    personalNombre?: string;
    personalID?: number;
    ac?: number;
    cv?: number;
}

export interface RootObject {
    total: number;
    data: Reporte[];
    pageNumber: number;
    pageSize: number;
}

