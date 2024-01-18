export interface IPaginateResponse<T> {
    data: T[];
    pagination: {
      next: number;
      hasNext: boolean;
      prev: number;
      hasPrev: boolean;
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }