// import type { FetchNotesResponse, NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';
import Link from 'next/link';

const NotesSidebar = async () => {
  const tags: string[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <ul className={css.menuList}>  
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map(tag => (
        <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
            </Link>
        </li>
    ))}
    </ul>
  );
};

export default NotesSidebar;