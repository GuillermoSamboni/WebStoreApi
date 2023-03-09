export class StructureResponse<T> {
    codeStatus: Number;
    message: String;
    error: String;
    count: Number;
    data: Array<T> | T;
}