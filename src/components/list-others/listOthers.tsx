import './listOthers-style.scss';
import ItemNote from "../item-note/itemNote";
import { Todo } from '../../types/todo';

const ListOthers = ({ 
  others, 
  deleteItem, 
  updateItem, 
  editItem, 
  setIsEditted,
  setTitle,
  setNote,
  setId,
  setColor,
}: {
  others: Todo[], 
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
    <div className='container-others'>
      <span className='text-list-other'>Outras</span>
      <div className='others-list'>
        {others.map((other: Todo, index: number) => (
          <ItemNote 
            setTitle={setTitle}
            setNote ={setNote}
            info={other} 
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

export default ListOthers;