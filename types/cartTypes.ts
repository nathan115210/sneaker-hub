// @ts-ignore
import type { ProductProps } from "./productTypes";

export interface CartProductProps extends ProductProps {
  qty: number;
}

export interface CartType {
  products: CartProductProps[];
  totalPrice: number;
}
