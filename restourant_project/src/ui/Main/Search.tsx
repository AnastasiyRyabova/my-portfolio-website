
interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  return (
    <input
    style={{width: '96%', padding: 20, margin: 15, borderRadius: 10, border: 'none', background: '#3333'}}
      type="text"
      placeholder="Search for restaurants"
      onChange={(e) => onSearch(e.target.value)} 
    />
  );
}
