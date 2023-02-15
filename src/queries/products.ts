import axios, { AxiosError } from "axios";
import API_PATHS from "~/constants/apiPaths";
import { AvailableProduct } from "~/models/Product";
import { useQuery, useQueryClient, useMutation } from "react-query";
import React from "react";

export function useAvailableProducts() {
  return useQuery<AvailableProduct[], AxiosError>(
    "available-products",
    async () => {
      const res = await axios
        .get<AvailableProduct[]>(`${API_PATHS.bff}/product/available/fail`)
        .catch((error) => {
          console.error(
            "Error during load products, enablinng mock data",
            error
          );
          return {
            data: [
              {
                description: "2.0 TDI FWD",
                id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                price: 24,
                title: "Ford Mondeo",
                count: 1,
              },
              {
                description: "3.0 TDI 4Motion",
                id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
                price: 15,
                title: "Volksvagen Touareg",
                count: 2,
              },
              {
                description: "1.8 VTEC FWD",
                id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
                price: 23,
                title: "Honda Civic",
                count: 3,
              },
              {
                description: "325 RWD",
                id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
                price: 15,
                title: "BMW 3",
                count: 4,
              },
              {
                description: "3.5 VQ35 4WD",
                id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
                price: 23,
                title: "Infiniti FX35",
                count: 5,
              },
            ] as AvailableProduct[],
          };
        });
      return res.data;
    }
  );
}

export function useInvalidateAvailableProducts() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("available-products", { exact: true }),
    []
  );
}

export function useAvailableProduct(id?: string) {
  return useQuery<AvailableProduct, AxiosError>(
    ["product", { id }],
    async () => {
      const res = await axios.get<AvailableProduct>(
        `${API_PATHS.bff}/product/${id}`
      );
      return res.data;
    },
    { enabled: !!id }
  );
}

export function useRemoveProductCache() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) =>
      queryClient.removeQueries(["product", { id }], { exact: true }),
    []
  );
}

export function useUpsertAvailableProduct() {
  return useMutation((values: AvailableProduct) =>
    axios.put<AvailableProduct>(`${API_PATHS.bff}/product`, values, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    })
  );
}

export function useDeleteAvailableProduct() {
  return useMutation((id: string) =>
    axios.delete(`${API_PATHS.bff}/product/${id}`, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    })
  );
}
