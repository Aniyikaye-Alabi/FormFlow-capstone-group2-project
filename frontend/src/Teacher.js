// Teacher.js

import React, { useState, useEffect } from "react";
import "./Teacher.css";

function Teacher() {
  const [teacherData, setTeacherData] = useState({
    name: "",
    subject: "",
    class: "",
  });

  const [data, setData] = useState([]);

  // Since Nginx proxies /api/* to the backend,
  // the frontend only needs a relative path.
  const API_BASE_URL = "/api";

  // Fetch all teachers
  const getData = () => {
    fetch(`${API_BASE_URL}/teacher`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to fetch teachers");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTeacherData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/addteacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });

      if (!response.ok) {
        throw new Error("Failed to add teacher");
      }

      await response.json();

      getData();

      setTeacherData({
        name: "",
        subject: "",
        class: "",
      });
    } catch (err) {
      console.error(err);
      alert("Unable to save teacher.");
    }
  };

  // Delete teacher
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      await response.json();
      getData();
    } catch (err) {
      console.error(err);
      alert("Unable to delete teacher.");
    }
  };

  return (
    <div className="teacher-container">
      <div className="teacher-layout">

        {/* Form Section */}
        <div className="content">
          <h2 className="store-teacher-details">
            Teacher Details
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={teacherData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={teacherData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Class</label>
              <input
                type="text"
                name="class"
                value={teacherData.class}
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
          <h2 className="teacher-details">
            Teacher Records
          </h2>

          <table className="teacher-table">
            <thead>
              <tr>
                <th>Teacher ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.id}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.class}</td>
                    <td>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDelete(teacher.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No teacher records found.
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

export default Teacher;