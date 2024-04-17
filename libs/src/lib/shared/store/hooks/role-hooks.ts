import { useState } from "react"
const myArray :any[] = []
export const useRole = () => {
    const [role,setRole] = useState(myArray)

    const addRole = (value:any) =>{
        role.push(value);
        setRole(role)
    }
    const removeRole = (value:any) => {
        const newRole = role.filter(element => element !== value)
        setRole(newRole)
    }

    return {role,addRole,removeRole}
}