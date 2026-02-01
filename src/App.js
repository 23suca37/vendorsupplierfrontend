import React, { useState } from "react";

export default function SingleTableSystem() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    id: null,
    vendorName: "",
    vendorType: "Vendor",
    productName: "",
    price: "",
    quantity: ""
  });

  const resetForm = () => {
    setForm({
      id: null,
      vendorName: "",
      vendorType: "Vendor",
      productName: "",
      price: "",
      quantity: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.vendorName || !form.productName) return;

    if (form.id) {
      setRows(rows.map(r => (r.id === form.id ? form : r)));
    } else {
      setRows([...rows, { ...form, id: Date.now() }]);
    }

    resetForm();
  };

  const editRow = (row) => setForm(row);
  const deleteRow = (id) => setRows(rows.filter(r => r.id !== id));

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Vendor / Supplier </h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Vendor / Supplier Name"
          value={form.vendorName}
          onChange={e => setForm({ ...form, vendorName: e.target.value })}
        />

        <select
          value={form.vendorType}
          onChange={e => setForm({ ...form, vendorType: e.target.value })}
        >
          <option>Vendor</option>
          <option>Supplier</option>
        </select>

        <input
          placeholder="Product Name"
          value={form.productName}
          onChange={e => setForm({ ...form, productName: e.target.value })}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />

        <button type="submit">
          {form.id ? "Update" : "Add"}
        </button>
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Vendor / Supplier</th>
            <th>Type</th>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan="6">No Data</td></tr>
          )}
          {rows.map(row => (
            <tr key={row.id}>
              <td>{row.vendorName}</td>
              <td>{row.vendorType}</td>
              <td>{row.productName}</td>
              <td>{row.price}</td>
              <td>{row.quantity}</td>
              <td>
                <button onClick={() => editRow(row)}>Edit</button>
                <button onClick={() => deleteRow(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}