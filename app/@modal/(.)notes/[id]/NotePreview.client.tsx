'use client';
import { useRouter } from 'next/navigation';
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from '@/components/Modal/Modal';

interface Props {
  id: string;
}

const NotePreviewClient = ({ id }: Props) => {
    const router = useRouter();
    const handleGoBack = () => {
    router.back(); 
    };

    const {
      data: note,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
      refetchOnMount: false,
    });
    if (isLoading) {
      return <p>Loading, please wait...</p>;
    }
    if (error || !note) {
      return <p>Something went wrong.</p>;
    }
    return (
        <Modal onClose={handleGoBack}>
        <div className={css.container}>
          <div className={css.item}>
              <div className={css.header}>
                  <h2>{note.title}</h2>
              </div>
              <p className={css.tag}>{note.tag}</p>
              <p className={css.content}>{note.content}</p>
              <button className={css.backBtn} onClick={handleGoBack}>
                Go Back
              </button>
              <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
        </Modal>
     );
 }

 export default NotePreviewClient;