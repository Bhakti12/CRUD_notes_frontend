import { apiRequest } from "./apiService";
import { config } from "./envConfig";

const AUTH_API_URL = `${config.API_BASE}/auth`;
const TASK_API_URL = `${config.API_BASE}/task`;

console.log(AUTH_API_URL);
console.log(TASK_API_URL);

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAT?: string;
  }
  

export const fetchNotes = async (): Promise<Note[]> => {
    const response =  await apiRequest(TASK_API_URL, "GET");
    return Array.isArray(response) ? response : [];
};

export const fetchNoteById = async (id: any): Promise<Note[]> => {
    return await apiRequest(`${TASK_API_URL}${id}`, "GET");
};

export const addNote = async (note: Note): Promise<Note> => {
    return await apiRequest(TASK_API_URL, "POST", note);
};

export const updateNote = async (id: any, note: Note): Promise<Note> => {
    return await apiRequest(`${TASK_API_URL}${id}`, "PUT", note);
};

export const deleteNote = async (id: any) => {
    return await apiRequest(`${TASK_API_URL}${id}`, "DELETE");
};

export const signUp = async(user: any) => {
    return await apiRequest(AUTH_API_URL, "POST", user);
}

export const login = async(user: any) => {
    return await apiRequest(AUTH_API_URL, "POST", user);
}