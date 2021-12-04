export interface PutUsuarioDto {
    id: number;
    email: string;
    password: string;
    nombre: string;
    apellidos: string;
    nivelPermiso: number;
}