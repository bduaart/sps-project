import { GetUserByIdResponse } from "./GetUserByIdResponse";

export interface GetUserResponse {
  items?: GetUserByIdResponse[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}
