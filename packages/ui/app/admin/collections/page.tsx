"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

export default function Collections() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs as any} // Type assertion to bypass type checking
        sortingOrder={["asc", "desc"]}
      />
    </div>
  );
}
