export default class ErrorResponse {
    ErrorMessage: string;
    constructor(errorMessage: string) {
        this.ErrorMessage = errorMessage;
    }
}