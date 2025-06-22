import axios from "axios";

export const authentificate = async (pseudo: string, password: string, callBack:(token:string)=> void) => {
    try {
        const response = await axios.post("http://localhost:5001/login",{
            pseudo,
            password
        });

        if(response.status == 201){
            callBack(response.data.data.token)
            return
        }
    } catch (error) {
        callBack(null)
    }
}