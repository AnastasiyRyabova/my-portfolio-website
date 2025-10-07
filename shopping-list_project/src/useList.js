import {useState} from "react";


export function useList() {
  let [ list, setList] = useState([])

  
  /** Создать новый элемент. */
  const createItem = () => {
    let listLength = list.length;
    let arr = list
    
    setList ([
      ... arr, 
      {
        id:listLength, 
        title:"", 
        done:false,
      },
    ]);
  };

  /**
   * Установить заголовок элемента.
   *
   * @param id - ID элемента.
   * @param title - Заголовок элемента.
   */
  const setItemTitle = (id, title) => {
    setList((state) =>
      state.map((obj) => (obj.id === id ? { ...obj, title} : obj))
    );
  };

  /**
   * Переключить выполненность элемента.
   *
   * @param id - ID элемента.
   */
  const toggleItem = (id) => {
    setList((state) =>
      state.map((obj) => (obj.id === id ? { ...obj, done: !obj.done } : obj))
    );
  };

  /**
   * Удалить элемент.
   *
   * @param id - ID элемента.
   */
  const deleteItem = (id) => {
    setList((state) => state.filter((obj) => obj.id != id));
  };

  return {
    list,
    createItem,
    setItemTitle,
    toggleItem,
    deleteItem,
  };
}
