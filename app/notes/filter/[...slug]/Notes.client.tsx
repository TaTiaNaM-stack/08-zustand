'use client';

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from 'next/navigation';
import { useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css"
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import NoteForm from "@/components/NoteForm/NoteForm";

interface Props {
  tag: string;
}

export default function NotesClient({ tag }: Props) {
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const { data: notes, isSuccess, error } = useQuery({
		queryKey: ['notes', {currentPage, searchQuery, tag}],
		queryFn: () => fetchNotes(searchQuery, currentPage, tag),
		placeholderData: keepPreviousData,
		refetchOnMount: false
	});

	const debouncedSearch = useDebouncedCallback ((value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	}, 1000);
	
  return (
	<div className={css.app}>
		<header className={css.toolbar}>
			<SearchBox searchQuery={searchQuery} onChange={debouncedSearch} />
			{isSuccess
				&& notes?.notes.length > 0 
				&& <Pagination 
					totalPages={notes.totalPages} 
					currentPage={currentPage} 
					onPageChange={( selected ) => setCurrentPage(selected)}
				 />}

			{<button className={css.button} onClick={openModal}>
				Create note +
			</button>}
		</header>
		{isSuccess 
			&& notes.notes.length > 0 
			? <NoteList notes={notes.notes} />
			: <p className={css.message}>{error ? 'Error fetching notes' : 'No notes found'}</p>
		}

		{isModalOpen && (
			<Modal onClose={closeModal}>
				<NoteForm onClose={closeModal} />
			</Modal>
		)}
	</div>
  )}