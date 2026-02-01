import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8081/api/vendors";

export default function SingleTableSystem() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    vendorName: "",
    vendorType: "Vendor",
    productName: "",
    price: "",
    quantity: ""
  });

  // GET data from backend
  useEffect(() => {
    axios.get(API).then(res => setRows(res.data));
  }, []);

  // POST data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(API, {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity)
    }).then(() => {
      axios.get(API).then(res => setRows(res.data));
    });

    setForm({
      vendorName: "",
      vendorType: "Vendor",
      productName: "",
      price: "",
      quantity: ""
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Vendor Name"
          value={form.vendorName}
          onChange={e => setForm({...form, vendorName: e.target.value})}
        />

        <input placeholder="Product Name"
          value={form.productName}
          onChange={e => setForm({...form, productName: e.target.value})}
        />

        <input placeholder="Price"
          value={form.price}
          onChange={e => setForm({...form, price: e.target.value})}
        />

        <input placeholder="Qty"
          value={form.quantity}
          onChange={e => setForm({...form, quantity: e.target.value})}
        />

        <button>Add</button>
      </form>

      <table border="1">
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.vendorName}</td>
              <td>{r.productName}</td>
              <td>{r.price}</td>
              <td>{r.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
