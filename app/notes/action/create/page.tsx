import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata} from "next";

export const metadata: Metadata = {
  title: "NoteHub - Create Note",
  description: "Create a new note on NoteHub.",
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

export default function CreateNote() {
  return (
    <main className={css.main}>
        <div className={css.container}>
            <h1 className={css.title}>Create note</h1>
            <NoteForm />
        </div>
    </main>
  );
}