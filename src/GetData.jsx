import axios from "axios";
async function GetData() {
  try {
    const data = await axios.get("https://fakestoreapi.com/products");
    return [...data.data.slice(0, 10)];
  } catch (error) {
    return [];
  }
}
export default GetData;
