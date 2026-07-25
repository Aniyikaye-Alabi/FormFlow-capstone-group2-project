import React, { useState, useEffect } from "react";
import "./Student.css";

const API_BASE_URL = "/api";

function Student() {
  const [studentData, setStudentData] = useState({
    name: "",
    rollNo: "",
    class: "",
  });

  const [data, setData] = useState([]);

  // Fetch all students
  const getData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/student`);

      if (!res.ok) {
        throw new Error("Failed to fetch students");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new student
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/addstudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!res.ok) {
        throw new Error("Unable to save student");
      }

      await res.json();

      setStudentData({
        name: "",
        rollNo: "",
        class: "",
      });

      getData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/student/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Unable to delete student");
      }

      await res.json();

      getData();
    } catch (err) {
      console.error(err);
    }
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
                data.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.roll_number}</td>
                    <td>{student.class}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
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