import { serverIP } from './apiConfig'
import { get } from './restFunctions'

export const getAllSubjects = () => get(`${serverIP}/subjects/all`)