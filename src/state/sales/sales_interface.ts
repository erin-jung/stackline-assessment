export interface SalesData {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
  }

export interface ProductDetails {
    id: string;
    title: string;
    image: string;
    subtitle: string;
    brand: string;
    retailer: string;
    details: string[];
    tags: string[];
    sales: SalesData[];
  }

export interface SalesInitialState {
    productDetails: ProductDetails;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}