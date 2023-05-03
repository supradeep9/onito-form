import { Link } from "react-router-dom";

import React, { useEffect, useRef } from "react";
import $ from "jquery";

import "datatables.net-dt/css/jquery.dataTables.min.css";
$.DataTable = require("datatables.net-dt");

const Table = ({ data }) => {
  const tableRef = useRef();

  useEffect(() => {
    $(tableRef.current).DataTable();
  }, [data]);

  return (
    <div>
      <Link to="/" className="home">
        Back Home{" "}
      </Link>
      <div className="tb">
        <table
          ref={tableRef}
          className="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Govt Id</th>
              <th>Guardian Details</th>
              <th>Nationnality</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((key) => {
              return (
                <tr key={key}>
                  <td>{data[key].name}</td>
                  <td>{data[key].age}</td>
                  <td>{data[key].address}</td>
                  <td>{data[key].mobile}</td>
                  <td>{data[key].govttId}</td>
                  <td>{data[key].guardianDetails}</td>
                  <td>{data[key].nationality}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
