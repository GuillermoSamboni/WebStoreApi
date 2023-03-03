export class StructureResponse<T> {
    code: number;
    message: string;
    count: number;
    data: Array<T> | T;
}