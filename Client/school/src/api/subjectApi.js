import { serverIP } from './apiConfig'
import { get, post, put } from './restFunctions'

export const getAllSubjects = () => get(`${serverIP}/subjects/active`)

export const addNewSubject = (name) => post(`${serverIP}/subjects/new`, {name})

export const deactiveSubject = (id) => put(`${serverIP}/subjects/deactivate/${id}`)