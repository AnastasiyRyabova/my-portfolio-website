import { z } from "zod";
import { validateResponse } from "./validateResponse";


export const UserShcema = z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
})

export type User = z.infer<typeof UserShcema>

export function fetchUser(): Promise<User> {
    return fetch(`/api/users/me`)
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserShcema.parse(data))
}

export function registerUser(
    {   username, 
        email, 
        password}:
     {username: string,
     email: string, 
     password: string }
): Promise<void>{
    return fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password })
    }).then(() => undefined)
}



export function login(email: string, password: string): Promise<void> {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, 
            password
        })
    })
    .then(validateResponse)
    .then(() => undefined)
}

export function fetchMe(): Promise<User> {
    return fetch ('/api/users/me')
    .then(validateResponse)
    .then(responce => responce.json())
    .then(data => UserShcema.parse(data))
}


export async function logout(): Promise<void> {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Ошибка при выходе');
    }
  }
  