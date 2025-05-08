export interface ApiResponse {
    success: boolean;
    message: string;
    id?: number | string;
    data?: any;
    error?: {
        message: string;
        code: string;
    };
}
export declare const createSuccessResponse: (data: any, id?: number | string) => ApiResponse;
export declare const createErrorResponse: (error: any, id?: number | string) => ApiResponse;
