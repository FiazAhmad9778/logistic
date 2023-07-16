export interface GenericResponseType<T> {
  errors: string[];
  message: string;
  success: true;
  isSuccess?: boolean;
  validationErrors?: ValidationError[];
  data: T;
}

export interface ValidationError {
  name: string;
  message: string;
}

export interface GenericCreateEntityResponse<T> {
  entityId: T;
}

export type ExtendedErrorResponse =
  | {
      status: number;
      data: GenericResponseType<Record<string, any>>;
    }
  | {
      status: 'FETCH_ERROR';
      data?: GenericResponseType<Record<string, any>>;
      error: string;
    }
  | {
      status: 'PARSING_ERROR';
      originalStatus: number;
      data: GenericResponseType<Record<string, any>>;
      error: string;
    }
  | {
      status: 'CUSTOM_ERROR';
      data?: GenericResponseType<Record<string, any>>;
      error: string;
    };
