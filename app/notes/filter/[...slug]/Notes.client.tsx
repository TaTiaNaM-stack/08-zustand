'use client';

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css"
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

interface Props {
  tag: string;
}

export default function NotesClient({ tag }: Props) {
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const { data: notes, isSuccess, error } = useQuery({
		queryKey: ['notes', currentPage, searchQuery, tag],
		queryFn: () => fetchNotes(searchQuery, currentPage, tag),
		placeholderData: keepPreviousData,
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
				&& notes?.notes.length > 1
				&& <Pagination 
					totalPages={notes.totalPages} 
					currentPage={currentPage} 
					onPageChange={( selected ) => setCurrentPage(selected)}
				 />}

			{<Link href="/notes/action/create" className={css.button}>Create Note</Link>}
		</header>
		{isSuccess 
			&& notes.notes.length > 0 
			? <NoteList notes={notes.notes} /> 
			: <p className={css.message}>No notes found</p>}
		{error && <p className={css.message}>{error ? 'Error fetching notes' : 'No notes found'}</p>}
	</div>
  )}