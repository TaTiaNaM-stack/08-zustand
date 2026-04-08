import css from "./Header.module.css";
import Link from 'next/link';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href='/' aria-label='Home' className={css.navigationLink}>
        NoteHub
      </Link>
      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li>
            <Link href='/' className={css.navigationLink}>Home</Link>
          </li>
          <li>
            <Link href='/notes/filter/all' className={css.navigationLink}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};


export default Header;