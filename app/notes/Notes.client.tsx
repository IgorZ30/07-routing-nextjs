"use client";

import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import type { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: NoteTag | "";
}

export default function NotesClient({ tag = "" }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, searchQuery, tag],
    queryFn: () => fetchNotes(currentPage, searchQuery, tag),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
