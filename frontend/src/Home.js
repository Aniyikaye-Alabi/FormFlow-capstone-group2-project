// Home.js

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home-container">
      <section className="content">
        <h1 className="title animated-text">
          Welcome to the Student–Teacher Portal
        </h1>

        <p className="subtitle">
          Manage student and teacher records quickly, securely, and efficiently.
        </p>

        <div className="button-container">
          <Link to="/student" className="student-button">
            Student Portal
          </Link>

          <Link to="/teacher" className="teacher-button">
            Teacher Portal
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;