return (
  <div className="student-container">
    <div className="student-layout">

      {/* Left Section - Form */}
      <div className="content">
        <h2 className="store-student-details">Student Details</h2>

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
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      {/* Right Section - Table */}
      <div className="table-section">
        <h2 className="student-details">Student Records</h2>

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
            {data.map((d) => (
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
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
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