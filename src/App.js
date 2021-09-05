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
    <div
      class="card"
      style={{
        width: "17em",
        height: "17em",
        float: "left",
        margin: "10px",
        alignItems: "center",
      }}
    >
      <img
        src="https://picsum.photos/50"
        alt="Card image cap"
        style={{ width: "10em", alignSelf: "center", margin: "5px" }}
      />
      <div class="card-body">
        <h5 class="card-title">{item.title.slice(0, 20)}</h5>
        <div>
          <button
            class="btn btn-outline-primary btn-sm"
            style={{ margin: "10px", float: "left", width: "10rem" }}
            onClick={
              () => handleAdd(item)
              // handleAdd();
            }
          >
            Add
          </button>
        </div>
      </div>
    </div>
  ));
  const cartitemlist = cartitems.map((item) => (
    <li
      class="list-group-item list-group-item-action "
      key={item.id}
      style={{ margin: "10px" }}
    >
      {item.title}
      <div>
        <button
          class="btn btn-danger btn-sm"
          style={{ margin: "10px" }}
          onClick={
            () => handleRemove(item)
            // handleAdd();
          }
        >
          Remove
        </button>
      </div>
    </li>
  ));

  return (
    // <div class="d-flex" id="wrapper">
    <div>
      <h1 style={{ margin: "30px", textAlign: "center" }}>Shopping App Demo</h1>

      <div class="container">
        <div class="column left sidebar-heading">
          <div class="container">
            <a href="#" class="link-secondary" style={{ fontSize: "1.5em" }}>
              Home
            </a>
            <br />
            <a href="#" class="link-secondary" style={{ fontSize: "1.5em" }}>
              About
            </a>
            <br />
            <a href="#" class="link-secondary" style={{ fontSize: "1.5em" }}>
              Contact
            </a>
            <br />
          </div>
        </div>

        <div class="column middle">
          <div class="bg-light border-right vh-100" id="sidebar-wrapper">
            <div class="sidebar-heading">
              <b>Select Products</b>
            </div>
            <div class="container" style={{ alignContent: "center" }}>
              {itemlist}
            </div>
          </div>
        </div>

        <div class="column right sidenav-right">
          <div class="border-right vh-100" id="sidebar-wrapper">
            <div class="sidebar-heading">
              Cart
              {(cartitems.length > 0 && (
                <button
                  className="btn btn-outline-success"
                  style={{ marginLeft: "3px" }}
                  onClick={() => handleSubmit()}
                >
                  Place Order
                </button>
              )) ||
                " :("}
            </div>
            <div class="list-group list-group-flush overflow-auto h-100">
              {cartitemlist}
            </div>
          </div>
          {/* {cartitems.length > 0 && ( */}
        </div>
      </div>
    </div>
    // <div className="App">
    //   <h1>Shopping Cart</h1>
    //   <div id="wrapper d-flex">
    //     <div class="bg-light border-right vh-100" id="sidebar-wrapper">
    //       <div class="sidebar-heading">Select Products </div>
    //       <div class="list-group list-group-flush overflow-auto h-100">
    //         {itemlist}
    //       </div>
    //     </div>

    //     {/* <div id="mySidenav" className="sidenav">
    //     <h1>Select Products</h1>
    //     <div style={{ overflowY: "auto" }}>
    //     <ul className="list-group">{itemlist}</ul>
    //     </div>
    //   </div> */}
    //     <div id="mySidenav" className="sidenav-right">
    //       <h1>Your Cart</h1>
    //       <ul>{cartitemlist}</ul>
    //       <button
    //         style={{ backgroundColor: "lightgreen" }}
    //         onClick={() => handleSubmit()}
    //       >
    //         Place Order
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
