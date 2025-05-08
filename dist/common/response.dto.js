"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorResponse = exports.createSuccessResponse = void 0;
const createSuccessResponse = (data, id) => {
    const responseData = data && data.password ? {
        id: data.id,
        email: data.email,
        password: undefined,
        phoneNumber: data.phoneNumber,
        created_at: data.created_at,
        updated_at: data.updated_at
    } : data;
    return {
        success: true,
        message: 'successful',
        data: responseData
    };
};
exports.createSuccessResponse = createSuccessResponse;
const createErrorResponse = (error, id) => {
    let errorMessage = error.message || 'An error occurred';
    if (error.code === '23505') {
        errorMessage = 'Email already exists';
    }
    else if (error.code === '23503') {
        errorMessage = 'Resource not found';
    }
    else if (error.code === '23502') {
        errorMessage = 'Missing required field';
    }
    return {
        success: false,
        message: errorMessage,
        error: {
            message: errorMessage,
            code: error.code || 'ERROR'
        },
        id
    };
};
exports.createErrorResponse = createErrorResponse;
//# sourceMappingURL=response.dto.js.map