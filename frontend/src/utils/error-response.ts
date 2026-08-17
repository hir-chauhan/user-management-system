export interface ErrorInfo {
  title: string;
  description: string;
}

export const extractErrorInfo = (error: any): ErrorInfo => {
  if (error?.response?.data?.message) {
    return {
      title: 'Error',
      description: error.response.data.message,
    };
  }
  if (error?.message) {
    return {
      title: 'Error',
      description: error.message,
    };
  }
  return {
    title: 'Error',
    description: 'An unexpected error occurred. Please try again.',
  };
};
