import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useCategories() {
  const { data, error } = useSWR("/api/categories", fetcher);

  return {
    categories: data ? ["all", ...data] : [],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useProducts(category: string) {
  const { data, error } = useSWR(
    `/api/products?category=${category || ""}&limit=25`,
    fetcher
  );

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useProduct(id: string) {
  const { data, error } = useSWR(
    `/api/products/${id}`,
    fetcher
  );

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}
