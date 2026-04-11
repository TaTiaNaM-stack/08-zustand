import {create} from 'zustand';
import {Note} from '@/types/note';
import {persist} from 'zustand/middleware';

interface NoteDraftStore {
    draft: Note;
    setDraft: (note: Note) => void;
    clearDraft: () => void;
}

const initialDraft: Note = {
    id: '',
    title: '',
    content: '',
    tag: 'Todo',
    createdAt: '',
    updatedAt: '',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
    draft: initialDraft,
    setDraft: (note: Note) => set({ draft: note }),
    clearDraft: () =>
        set({
            draft: initialDraft,
        })}),
        {
            name: 'note-draft',
            partialize: (state) => ({ draft: state.draft }),
        },
    ),
);