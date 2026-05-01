import { useState, KeyboardEvent } from 'react';

interface Props {
  onSearch: (city: string) => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, loading }: Props) => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    if (value.trim()) onSearch(value.trim());
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Şəhər adı daxil edin... (məs: Baku, London)"
        disabled={loading}
      />
      <button onClick={handleSearch} disabled={loading || !value.trim()}>
        {loading ? '⏳' : '🔍 Axtar'}
      </button>
    </div>
  );
};