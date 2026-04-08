import axios from 'axios';
import type { CreateNoteData, Note, FetchNotesResponse } from '../types/note';

const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export const fetchNotes = async (searchQuery: string, currentPage: number, tag: string): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>('/notes', {
      params: {
        page: currentPage,
        perPage: 12,
        ...(searchQuery && { search: searchQuery }),
        ...(tag && tag !== "all" && { tag }),
      },
    }); 

    return response.data;
}

export const createNote = async (newTodo: CreateNoteData): Promise<Note> => {
    const response = await axios.post<Note>('/notes', newTodo);
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${id}`);
    return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await axios.get<Note>(`/notes/${id}`);
    return response.data;
}
