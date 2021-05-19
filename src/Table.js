import React from "react";
import './Table.css'

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
      {/* same as above (the below code) */}
      {/* {countries.map((data) => (
        <tr>
          <td>{data.country}</td>
          <td>
            <strong>{data.cases}</strong>
          </td>
        </tr>
      ))} */}
    </div>
  );
}

export default Table;
