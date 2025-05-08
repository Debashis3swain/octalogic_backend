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

export const createSuccessResponse = (data: any, id?: number | string): ApiResponse => {
  // If data is a user object, remove sensitive fields and format with desired order
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

export const createErrorResponse = (error: any, id?: number | string): ApiResponse => {
  let errorMessage = error.message || 'An error occurred';
  
  // Handle specific error cases
  if (error.code === '23505') {
    errorMessage = 'Email already exists';
  } else if (error.code === '23503') {
    errorMessage = 'Resource not found';
  } else if (error.code === '23502') {
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
