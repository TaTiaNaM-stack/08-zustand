'use client';

import css from './SearchBox.module.css'

interface SearchBoxProps {
    onChange: (value: string) => void; 
    searchQuery: string; 
}

export default function SearchBox({ onChange, searchQuery }: SearchBoxProps ) {
const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        onChange(e.target.value);
      }

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchQuery}
      onChange={handleChange}
    />
  )
}