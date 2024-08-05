import { toast } from "react-toastify"

export const Toast = (message:string,type?:string) =>{
    switch(type) {
        case "success" :
            return toast.success(message)
        case "info" :
            return toast.info(message)
        case "warning" :
            return toast.warning(message)
        case "danger" :
            return toast.error(message)
        default :
            return toast.success(message ? message : "success")
    }
}

//export  Toast