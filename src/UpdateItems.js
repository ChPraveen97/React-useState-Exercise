import { useEffect, useState } from "react";
import ListItems from "./listItems";

export default function UpdateItems() {
  const list = [
    { id: 1, name: "Apples" },
    { id: 2, name: "Oranges" },
    { id: 3, name: "Mangos" },
  ];
  const [newItem, setNewItem] = useState("");
  const [itemsList, setItemsList] = useState(list);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(4);

  useEffect(() => {
    console.log(itemsList);
  });

  const indexOfItem = (newItem, itemsList) => {
    let index = null;
    for (let item in itemsList) {
      if (
        itemsList[item].name.trim().toLowerCase() ===
        newItem.trim().toLowerCase()
      ) {
        index = item;
        break;
      }
    }
    return index;
  };

  const handleAdd = () => {
    let index = indexOfItem(newItem, itemsList);
    if (index === null) {
      setId(id + 1);
      const newList = [
        ...itemsList,
        { id: id, name: newItem[0].toUpperCase() + newItem.slice(1) },
      ];
      setItemsList(newList);
      setMessage("");
    } else {
      setMessage(
        newItem[0].toUpperCase() +
          newItem.slice(1) +
          " already exists in the list!"
      );
    }
    setNewItem("");
  };

  const handleRemove = () => {
    let index = indexOfItem(newItem, itemsList);
    if (index !== null) {
      const newList = [
        ...itemsList.slice(0, index),
        ...itemsList.slice(parseInt(index) + 1),
      ];
      setItemsList(newList);
      setMessage(itemsList[index].name + " removed from the list");
    } else {
      setMessage(
        "Cannot find '" +
          newItem[0].toUpperCase() +
          newItem.slice(1) +
          "' in the list!"
      );
    }
    setNewItem("");
  };

  return (
    <div className="App">
      <h2>Grocery List</h2>
      <p className="alert">{message === "" ? "" : message}</p>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      ></input>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleRemove}>Remove</button>
      <ListItems>{itemsList}</ListItems>
    </div>
  );
}
