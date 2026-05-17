import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  tag: NoteTag | "" = "",
): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag && { tag }),
    },
  });
  return res.data;
};

interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (newNote: NewNote) => {
  const res = await axios.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};
