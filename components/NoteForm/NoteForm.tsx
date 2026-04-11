'use client';
import css from './NoteForm.module.css'
import {useMutation, useQueryClient} from '@tanstack/react-query';
import type {CreateNoteData} from '../../types/note';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';


export default function NoteForm() {
  const queryClient = useQueryClient();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
    onError: (error) => {
      console.error('Error creating note:', error);
    }
  });
  const handleSubmit = (formData: FormData) => {

      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const tag = formData.get('tag') as string;
    mutate({ title, content, tag } as CreateNoteData);
  };
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };


  return (
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            type="text" 
            name="title"
            value={draft.title} 
            onChange={handleChange}
            className={css.input} 
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            onChange={handleChange}
            value={draft.content}
            rows={8}
            className={css.textarea}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            required
            id="tag"
            name="tag"
            onChange={handleChange}
            value={draft.tag}
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="submit"
            id="create"
            className={css.submitButton}
            disabled={!draft.title || !draft.tag}
          >
            Create note
          </button>
        </div>
      </form>
  )
}