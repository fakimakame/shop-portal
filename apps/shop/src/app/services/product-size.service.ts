import { api, Toast } from "@shop-portal/libs"
// eslint-disable-next-line @nx/enforce-module-boundaries
import http from "../../../../../libs/src/lib/shared/services/http.service"
export class ProductSizeService {
    public async getProductSize(productId: number, sampleId: number): Promise<any> {
        try {
            const response = await http.get(`${api.java_url}/size/${productId}/${sampleId}`)
            return response.data
        } catch (error) {
            console.log("this is error", error)
            //throw error
        }
    }

    public async getStoreProductSize(productId: number, sampleId: number): Promise<any> {
        try {
            const response = await http.get(`${api.java_url}/size/store/${productId}/${sampleId}`)
            return response.data
        } catch (error) {
            console.log("this is error", error)
            //throw error
        }
    }

    public async addQuantities(sizeData: any, productId: number, sampleId: number): Promise<any> {
        try {
            const response = await http.post(`${api.java_url}/size/addQuantity/${productId}/${sampleId}`, sizeData)
            return response.data
        } catch (error) {
            console.log("this is error", error)
        }
    }
    public async addQuantitiesToStore(sizeData: any, productId: number, sampleId: number): Promise<any> {
        try {
            const response = await http.post(`${api.java_url}/size/store/addQuantity/${productId}/${sampleId}`, sizeData)
            console.log("this is my result", response.data)
            const result = response.data
            Toast(result.message)
            return response.data
        } catch (error) {
            console.log("this is error", error)
        }
    }
    public async addQuantitiesToCart(sizeData: any, productId: number, sampleId: number): Promise<any> {
        try {
            const response = await http.post(`${api.java_url}/size/cart/addQuantity/${productId}/${sampleId}`, sizeData)
            //console.log("this is my result", response.data)
            const result = response.data
            Toast(result.message)
            return response.data
        } catch (error) {
            console.log("this is error", error)
        }
    }

    public async getAvailableStore(sampleId: number): Promise<any> {
        try {
            const response = await http.get(`${api.java_url}/store/${sampleId}`)
            return response.data
        } catch (error) {
            console.log("this is error", error)
            //throw error
        }
    }
}