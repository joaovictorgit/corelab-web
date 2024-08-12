import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { RiPaintFill } from "react-icons/ri";
import './itemNote-style.scss'
import { Todo } from '../../types/todo';

const ItemNote = ({
  setTitle,
  setNote,
  info, 
  deleteItem, 
  updateItem, 
  editItem, 
  setIsEditted,
  setId,
  setColor,
}: {
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setNote: React.Dispatch<React.SetStateAction<string>>,
  info: Todo, 
  deleteItem: Function, 
  updateItem: Function, 
  editItem: Function, 
  setIsEditted: React.Dispatch<React.SetStateAction<boolean>>,
  setId: React.Dispatch<React.SetStateAction<string>>,
  setColor: React.Dispatch<React.SetStateAction<string>>,
}) => {
  const initialTitle = info?.title || '';
  const initialNote = info?.content || '';
  const initialIsStarred = info?.isFavorite || false;
  const initialColor = info?.color || '#FFFFFF';
  
  const [showModalColors, setShowModalColors] = useState(false);
  const modalRef = useRef<any>(null);
  const colors = [
    '#BAE2FF', '#B9FFDD', '#FFE8AC', '#FFCAB9', '#F99494', '#9DD6FF', 
    '#ECA1FF', '#DAFF8B', '#FFA285', '#CDCDCD', '#979797', '#A99A7C'
  ];

  const toggleModalColors = () => {
    setShowModalColors(!showModalColors);
  }

  const deleteItemList = () => {
    deleteItem(info.id);
  }

  const changeColor = (color: string) => {
    updateItem(info.id, { ...info, color });
    setColor(color);
    setShowModalColors(false);
  }

  const edit = () => {
    setId(info?.id);
    setTitle(initialTitle);
    setNote(initialNote);
    editItem({title: initialTitle, note: initialNote, isStarred: initialIsStarred}); 
    setIsEditted(true);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModalColors(false);
      }
    };

    if (showModalColors) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModalColors]);

  return (
    <div 
      className='container-item-note' 
      style={{ background: initialColor, }}
    >
      <div 
        className='container-title-item-note'
        style={
          {
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: `${initialColor === '#FFFFFF' ? '#d9d9d9' : '#FFFFFF'}`
          }
        }
      >
        <input 
          type='text' 
          className='title-item-note'
          placeholder='Título'
          value={initialTitle} 
          readOnly
        />

        <div className='icon-item-note'>
          {initialIsStarred ? ( <MdOutlineStar size={20} color='#FFA000'/> ) : ( <MdOutlineStarBorder size={20}/> )}
        </div>
      </div>

      <textarea
        className='note-text'
        placeholder='Clique ou arraste o arquivo para esta área para fazer upload'
        value={initialNote}
        readOnly
      />

      <div className='container-actions-note'>
        <div className='actions'>
          <BiPencil className='btn' size={24} onClick={edit}/>
          <RiPaintFill className='btn' size={24} onClick={toggleModalColors}/>
        </div>

        <div className='btn-delete'><MdOutlineClose size={24} onClick={deleteItemList}/></div>
      </div>

      {showModalColors && (
        <div className='modal' ref={modalRef}>
          <div className='modal-itens'>
            {colors.map((color, index) => (
              <div
                key={index}
                className='modal-item'
                style={{ backgroundColor: color }}
                onClick={() => { changeColor(color); }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemNote;