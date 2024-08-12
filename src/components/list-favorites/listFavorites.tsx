import React from 'react';
import { Todo } from '../../types/todo';
import ItemNote from '../item-note/itemNote';
import './listFavorites-style.scss';

const ListFavorites = ({ 
  favorites,
  deleteItem,
  updateItem,
  editItem,
  setIsEditted,
  setTitle,
  setNote,
  setId,
  setColor,
}: {
  favorites: Todo[],
  deleteItem: Function,
  updateItem: Function,
  editItem: Function,
  setIsEditted: React.Dispatch<React.SetStateAction<boolean>>,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setNote: React.Dispatch<React.SetStateAction<string>>,
  setId: React.Dispatch<React.SetStateAction<string>>,
  setColor: React.Dispatch<React.SetStateAction<string>>,
}) => {
  return (
    <div className='container-favorites'>
      <span className='text-list'>Favoritas</span>
      <div className='favorites-list'>
        {favorites.map((favorite: Todo, index: number) => (
          <ItemNote 
            setTitle={setTitle}
            setNote ={setNote}
            info={favorite} 
            key={index} 
            deleteItem={deleteItem} 
            updateItem={updateItem} 
            editItem={editItem} 
            setIsEditted={setIsEditted}
            setId={setId}
            setColor={setColor}
          />
        ))}
      </div>
    </div>
  );
}

export default ListFavorites;