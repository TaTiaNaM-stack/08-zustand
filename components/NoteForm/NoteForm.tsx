'use client';
import css from './NoteForm.module.css'
import {useMutation, useQueryClient} from '@tanstack/react-query';
import type {CreateNoteData} from '../../types/note';
import { createNote } from '@/lib/api';
import { Metadata} from "next";

export const metadata: Metadata = {
  title: "NoteHub - Create Note",
  description: "Create a new note on NoteHub.",
  // url: 'https://notehub.com/notes/action/create',
  openGraph: {
    title: 'Create a New Note on NoteHub',
    description: 'Create a new note on NoteHub.',
    url: 'https://notehub.com/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630
      }
    ]
  }
};

interface NoteFormProps {
  onSubmit: () => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // const queryClient = useQueryClient();
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSubmit();
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
  // const { mutate } = useMutation({
  //   mutationFn: createNote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['notes'] });
  //     onSubmit();
  //   },
  //   onError: (error) => {
  //     console.error('Error creating note:', error);
  //     }
  // });

  // const handleSubmit = (values: CreateNoteData) => {
  //     mutate(values);
  //   };

  return (
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
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
          <button type="button" className={css.cancelButton} onClick={onSubmit}>
            Cancel
          </button>
          <button
            type="submit"
            id="create"
            className={css.submitButton}
            disabled={false}
          >
            Create note
          </button>
        </div>
      </form>
  )
}