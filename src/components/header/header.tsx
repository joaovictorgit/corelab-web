import { useState } from 'react';
import Logo from '../../assets/note.png';
import { MdOutlineClose } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import './header-style.scss';

const Header = ({ 
  id,
  deleteItem,
  setTitle,
  setNote,
  setIsStarred,
  searchItem 
}: {
  id: string,
  deleteItem: Function,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setNote: React.Dispatch<React.SetStateAction<string>>,
  setIsStarred: React.Dispatch<React.SetStateAction<boolean>>
  searchItem: Function,
}) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const searchByTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchItem(search);
      setSearch('');
    }
  }

  const deleteItemList = () => {
    deleteItem(id);
    setTitle('');
    setNote('');
    setIsStarred(false);
  }

  return (
    <header className='container-header'>
      <div className='header-info'>
        <div className='header-logo'>
          <img src={Logo} alt='logo' className='logo-header'/>
          <span className='header-logo-text'>CoreNotes</span>
        </div>

        <div className='header-search'>
          <div className='input-container'>
            <input 
              className='input-search' 
              placeholder='Pesquisar notas' 
              type='text' 
              value={search} 
              onChange={handleInputChange}
              onKeyDown={searchByTitle}
            />

            <span className='search-icon'>
              <IoSearch />
            </span>
          </div>
        </div>
      </div>

      <div className='btn-close'><MdOutlineClose size={20} onClick={deleteItemList}/></div>
    </header>
  );
}

export default Header;