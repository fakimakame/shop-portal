import { api } from "@shop-portal/libs"
// eslint-disable-next-line @nx/enforce-module-boundaries
import http from "../../../../../libs/src/lib/shared/services/http.service"

export class MainStoreService {
    public async getAvailableMainStore(productId: number): Promise<any> {
        try {
            const response = await http.get(`${api.java_url}/store/${productId}`)
            return response.data
        } catch (error) {
            console.log("this is error", error)
            //throw error
        }
    }
}