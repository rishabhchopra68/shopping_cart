import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [items, setitems] = useState([]);

  const [cartitems, setcartitems] = useState([]);

  const [selecteditem, setselecteditem] = useState({});

  async function getData() {
    try {
      const data = await axios.get("https://fakestoreapi.com/products");

      setitems(data.data.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function handleAdd(item) {
    setselecteditem({ ...item });
    let newitemslist = [...items];
    newitemslist = newitemslist.filter((curr) => curr.id !== item.id);

    let newcartitemslist = [...cartitems];
    newcartitemslist.push({ ...item });

    setitems(newitemslist);
    setcartitems(newcartitemslist);
    console.log({ ...selecteditem });
  }

  function handleRemove(item) {
    setselecteditem({ ...item });
    console.log({ ...item });
    let newcartitemslist = [...cartitems];
    newcartitemslist = newcartitemslist.filter((curr) => curr.id !== item.id);

    let newitemslist = [...items];
    newitemslist.push({ ...item });

    setitems(newitemslist);
    setcartitems(newcartitemslist);
    console.log({ ...selecteditem });
  }

  function handleSubmit() {
    setselecteditem({});
    getData();
    setcartitems([]);
  }

  const itemlist = items.map((item) => (
    <li key={item.id}>
      {item.title}
      <button
        style={{ margin: "10px" }}
        onClick={
          () => handleAdd(item)
          // handleAdd();
        }
      >
        Add
      </button>
    </li>
  ));
  const cartitemlist = cartitems.map((item) => (
    <li key={item.id} style={{ margin: "10px" }}>
      {item.title}
      <button
        style={{ margin: "10px" }}
        onClick={
          () => handleRemove(item)
          // handleAdd();
        }
      >
        Remove
      </button>
    </li>
  ));

  return (
    <div className="App">
      <h1>Shopping Cart</h1>
      <div id="mySidenav" className="sidenav">
        <h1>Select Products</h1>
        <ul>{itemlist}</ul>
      </div>
      <div id="mySidenav" className="sidenav-right">
        <h1>Your Cart</h1>
        <ul>{cartitemlist}</ul>
        <button
          style={{ backgroundColor: "lightgreen" }}
          onClick={() => handleSubmit()}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default App;
