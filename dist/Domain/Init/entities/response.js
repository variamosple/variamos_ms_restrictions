"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseAPIError = exports.ResponseAPISuccess = void 0;
class ResponseAPISuccess {
    constructor(transactionId, message, data) {
        this.transactionId = transactionId;
        this.message = message;
        this.data = data;
    }
}
exports.ResponseAPISuccess = ResponseAPISuccess;
class ResponseAPIError {
    constructor(transactionId, message, errorCode, data) {
        this.transactionId = transactionId;
        this.message = message;
        this.errorCode = errorCode;
        this.data = data;
    }
}
exports.ResponseAPIError = ResponseAPIError;
