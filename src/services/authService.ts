import api_url from "./api";
import { IUser } from "../interfaces/user";

export async function login(
    email: string,
    password: string,
): Promise< IUser | null > {
    
    const response = await fetch(`${api_url}/users?email=${email}&password=${password}`)

    const users: IUser[] = await response.json()
    console.log(users)

    if(users.length === 0){
        return null
    }

    return users[0]

}

