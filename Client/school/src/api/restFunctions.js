import { serverIP } from "./apiConfig";

export const get = async (url) => {
    const response = await fetch(url, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': `${serverIP}`,
            'Access-Control-Allow-Credentials': 'true',
            

        },
        credentials: 'include',
    }).then((res) => {
        console.log("A", res)
        if(res.status === 401){
            console.log("Unauthorized request: ", url)
        }
        return res;
    }).catch((err) => {
        console.log("Error loading resource: ", url)
    })

    if(!response){
        alert("אירעה שגיאה בטעינת נתונים מהשרת")
        return false;
    } else {
        let res;
        try {
            res = response.json()
        } catch (error) {
            res = response;
        } finally {
            return res;
        }
    }
}

export const post = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': `${serverIP}`,
            'Access-Control-Allow-Credentials': 'true'
        },
        credentials: "include",
        body: JSON.stringify(body)
    }).then(res => {
        console.log("PLS", res)
        return res
    }).catch(err => {
        console.log("h")
    })

    
    let resData = await response.json()
    resData["success"] = response.ok;
    
    if(!response.ok){
        return false;
    } else {
        return resData;
    }
}

