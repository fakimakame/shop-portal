
import { api } from '@shop-portal/libs';
import { environment } from '../../environments/environment.prod';
export const getSizeByProductId = (id: number) => {
    return new Promise((resolve, reject) => {
        fetch(`${api.java_url}/${id}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    })
}