// Student.js

import React, { useState, useEffect } from "react";
import "./Student.css";

function Student() {
  const [studentData, setStudentData] = useState({
    name: "",
    rollNo: "",
    class: "",
  });

  const [data, setData] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch all students
  const getData = () => {
    fetch(`${API_BASE_URL}/student`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    };

    fetch(`${API_BASE_URL}/addstudent`, requestOptions)
      .then((res) => res.json())
      .then(() => {
        getData();

        setStudentData({
          name: "",
          rollNo: "",
          class: "",
        });
      })
      .catch((err) => console.log(err));
  };

  // Delete record
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/student/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => getData())
      .catch((err) => console.error(err));
  };

  return (
    <div className="student-container">
      <div className="student-layout">

        {/* Form Section */}
        <div className="content">
          <h2 className="store-student-details">
            Student Details
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={studentData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Roll Number</label>
              <input
                type="text"
                name="rollNo"
                value={studentData.rollNo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Class</label>
              <input
                type="text"
                name="class"
                value={studentData.class}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="table-section">
          <h2 className="student-details">
            Student Records
          </h2>

          <table className="student-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.roll_number}</td>
                    <td>{d.class}</td>
                    <td>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDelete(d.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No student records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Student;