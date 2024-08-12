import React from 'react';
import './formItem-style.scss';
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";

const FormItem = ({ 
  id,
  title,
  setTitle,
  isStarred,
  setIsStarred,
  note,
  setNote,
  addItem,
  isEditted,
  updateItem
}: {
  id: string,
  title: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  isStarred: boolean,
  setIsStarred: React.Dispatch<React.SetStateAction<boolean>>,
  note: string,
  setNote: React.Dispatch<React.SetStateAction<string>>,
  addItem: Function,
  isEditted: boolean,
  updateItem: Function,
}) => {
  
  const changeIcon = () => {
    setIsStarred(!isStarred);
  }

  const handleChangeInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }
  
  const handleChangeInputNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  }

  const addItemList = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!isEditted) {
        addItem();
      } else {
        updateItem(id, { title, content: note, isFavorite: isStarred });
      }
    }
  }

  return (
    <div className='container-form-item'>
      <div className='container-title-form-input'>
        <input 
          type='text' 
          className='title-form-input' 
          placeholder='Título'
          value={title}
          onChange={handleChangeInputTitle}
        />

        <div onClick={changeIcon} className='icon-form-input'>
          {isStarred ? ( <MdOutlineStar size={20} color='#FFA000'/> ) : ( <MdOutlineStarBorder size={20}/> )}
        </div>
      </div>

      <input 
        type='text'
        className='note-form-input'
        value={note}
        placeholder='Criar nota...'
        onChange={handleChangeInputNote}
        onKeyDown={addItemList}
      />
    </div>
  );
}

export default FormItem;