import './App.scss';
import Header from './components/header/header';
import FormItem from './components/form-item/formItem';
import { useEffect, useState } from 'react';
import api from './services/api';
import ListFavorites from './components/list-favorites/listFavorites';
import ListOthers from './components/list-others/listOthers';
import { Todo } from './types/todo';

function App() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [others, setOthers] = useState<any[]>([]);
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isEditted, setIsEditted] = useState<boolean>(false);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [color, setColor] = useState<string>('');

  const getAllFavorites = async () => {
    try {
      const res = await api.get('/')
        .then(response => {
          const favorites = response.data;
          return favorites.filter((item: Todo) => item.isFavorite);
        });
      setFavorites(res);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllOthers = async () => {
    try {
      const res = await api.get('/')
        .then(response => {
          const others = response.data;
          return others.filter((item: Todo) => !item.isFavorite);
        });
      setOthers(res);
    } catch (error) {
      console.log(error);
    }
  }

  const addItem = async (content = '') => {
    try {
      await api.post('/', {
        title,
        content: content !== '' ? content : note,
        isFavorite: isStarred,
      });

      if (isStarred) {
        setIsStarred(false);
      }
      setTitle('');
      setNote('');

      await getAllFavorites();
      await getAllOthers();
    } catch (error) {
      console.log(error);
    }
  }

  const editItem = (item: any) => {
    setTitle(item.title);
    setNote(item.note);
    setIsStarred(item.isStarred);
  }

  const updateItem = async (id: string, data: any) => {
    try {
      await api.patch(`/${id}`, data);

      setTitle('');
      setNote('');
      setIsStarred(false);
      
      await getAllFavorites();
      await getAllOthers();
      
    } catch (error) {
      console.log(error);
    }
  }

  const searchItem = async (search: string) => {
    try {
      const res = await api.get(`/search/${search}`)
        .then(response => {
          return response.data[0];
        })
      setId(res.id);
      setTitle(res.title);
      setNote(res.content);
      setIsStarred(res.isFavorite);
    } catch (error) {
      console.log('error');
    }
  }

  const deleteItem = async (id: string) => {
    try {
      await api.delete(`/${id}`);
      
      await getAllFavorites();
      await getAllOthers();
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault(); 
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        addItem(e.target?.result as string);
      };
      
      reader.readAsText(file);
    } else {
      alert('Arquivo vazio ou no formato errado');
    }
  };

  useEffect(() => { getAllFavorites() }, []);
  useEffect(() => { getAllOthers() }, []);

  return (
    <div 
      className='container-body'
      onDragOver={handleDragOver} 
      onDrop={handleDrop}
    >
      <Header 
        id={id}
        deleteItem={deleteItem}
        setTitle={setTitle}
        setNote={setNote}
        setIsStarred={setIsStarred}
        searchItem={searchItem}
      />
      <FormItem 
        id={id}
        title={title}
        setTitle={setTitle}
        isStarred ={isStarred}
        setIsStarred ={setIsStarred}
        note ={note}
        setNote ={setNote}
        addItem={addItem}
        isEditted={isEditted}
        updateItem={updateItem}
      />

      <div className='lists'>
        <ListFavorites 
          favorites={favorites} 
          deleteItem={deleteItem} 
          updateItem={updateItem} 
          editItem={editItem} 
          setIsEditted={setIsEditted}
          setTitle={setTitle}
          setNote ={setNote}
          setId={setId}
          setColor={setColor}
        />

        <ListOthers 
          others={others} 
          deleteItem={deleteItem} 
          updateItem={updateItem}
          editItem={editItem} 
          setIsEditted={setIsEditted} 
          setTitle={setTitle}
          setNote ={setNote}
          setId={setId}
          setColor={setColor}
        />
      </div>

    </div>
  );
}

export default App;
