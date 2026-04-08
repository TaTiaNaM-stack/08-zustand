'use client';
import css from "./LayoutNotes.module.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <section className={css.container}>
        <aside className={css.sidebar}>
          {sidebar}
        </aside>
        <div className={css.notesWrapper}>
          {children}
        </div>
      </section>
    </QueryClientProvider>
  );
};

export default NotesLayout;
