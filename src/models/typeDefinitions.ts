export interface ApiResponse {
  ok: boolean;
  value?: {
    message?: string;
    data: {
      token: string;
    };
  };
}
