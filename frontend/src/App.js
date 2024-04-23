import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'; // Updated import
import './App.css';

function CoursePage({ match }) {
  // Using useParams to access route parameters with react-router-dom v6
  const { courseName } = useParams();
  return (
    <div className="App">
      <h1>{courseName}</h1>
      {/* Add content for the course page here */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="header">Choose a course</h1> {/* Header */}
        <div className="button-container">
          <Link to="/COMPSCI10"><button>CS10</button></Link>
          <Link to="/COMPSCI61A"><button>CS61A</button></Link>
          <Link to="/COMPSCI61B"><button>CS61B</button></Link>
          <Link to="/COMPSCI61C"><button>CS61C</button></Link>
          <Link to="/COMPSCI70"><button>CS70</button></Link>
          <Link to="/COMPSCI161"><button>CS161</button></Link>
          <Link to="/COMPSCI162"><button>CS162</button></Link>
          <Link to="/COMPSCI168"><button>CS168</button></Link>
          <Link to="/COMPSCI184"><button>CS184</button></Link>
          <Link to="/COMPSCI186"><button>CS186</button></Link>
          <Link to="/COMPSCI170"><button>CS170</button></Link>
          <Link to="/COMPSCI182"><button>CS182</button></Link>
          <Link to="/COMPSCI188"><button>CS188</button></Link>
          <Link to="/COMPSCI189"><button>CS189</button></Link>
          <Link to="/COMPSCI191"><button>CS191</button></Link>
        </div>
      </div>

      <Routes> {/* Changed from Switch to Routes */}
        <Route path="/:courseName" element={<CoursePage />} /> {/* Changed from component to element */}
      </Routes>
    </Router>
  );
}

export default App;