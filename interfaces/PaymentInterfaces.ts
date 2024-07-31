import { AxiosError } from "axios";

export interface PaymentItem {
  amount: number;
  currency: string;
  payment_method_id: string;
}

export interface PaymentResponse {
  message: string;
}

export interface ProcessPaymentResult {
  data: PaymentResponse | null;
  error: AxiosError | null;
}