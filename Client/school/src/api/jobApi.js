import { serverIP } from './apiConfig';
import { get } from './restFunctions';

export const getJobList = () => {
    return get(`${serverIP}/jobs`).then(res =>{
        return res ? res : []
    })
}
