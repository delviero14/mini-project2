import { IAuthorLogin, IAuthorReg } from "@/type/author"
export const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"

export const regAuthor = async (data: IAuthorReg) => {
    const res = await fetch(`${base_url}/authors`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const result = await res.json()
    return { result, ok: res.ok }
}


    export const loginAuthor = async (data: IAuthorLogin) => {
        const res = await fetch(`${base_url}/authors/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }   
        });
        const result = await res.json();
        
        if (res.ok && result.token) {
            // Simpan token ke localStorage
            localStorage.setItem('token', result.token);
        }

        return { result, ok: res.ok };
    };

export const verifyAuthor = async (token: string) => {
    const res = await fetch(`${base_url}/authors/verify`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const result = await res.json()
    return { result, ok: res.ok }
}