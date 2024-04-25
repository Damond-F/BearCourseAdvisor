import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, Navigate } from 'react-router-dom'; // Updated import
import './App.css';
import ChatBot from './components/chatBot'
import Comments from './components/comments';
import CS10 from './components/routingComponents/CS10'
import CS61A from './components/routingComponents/CS61A'
import CS47B from './components/routingComponents/CS47B'
import CS61B from './components/routingComponents/CS61B'
import CS61C from './components/routingComponents/CS61C'
import CS70 from './components/routingComponents/CS70'
import CS161 from './components/routingComponents/CS161'
import CS162 from './components/routingComponents/CS162'
import CS168 from './components/routingComponents/CS168'
import CS170 from './components/routingComponents/CS170'
import CS182 from './components/routingComponents/CS182'
import CS184 from './components/routingComponents/CS184'
import CS186 from './components/routingComponents/CS186'
import CS188 from './components/routingComponents/CS188'
import CS189 from './components/routingComponents/CS189'

function CoursePage({ match }) {
  // Using useParams to access route parameters with react-router-dom v6
  const { courseName } = useParams();
  return (
    <div className="App">
      <h1>{courseName}</h1>
      {/* Add content for the course page here */}
      <h3><Comments courseCode={courseName} /> </h3>
    </div>

  );
}

function App() {
  const [activePath, setActivePath] = useState('');

  const handleButtonClick = (path) => {
    setActivePath(path);
  };

  const renderButton = (path, label) => (
    <Link to={path}>
      <button className={`course-button ${activePath === path ? 'active' : ''}`}
        onClick={() => handleButtonClick(path)}>
        {label}
      </button>
    </Link>
  );

  return (
    <Router>
      <div className="container">
        <h1 className="header">Choose a course</h1> {/* Header */}
        <div className="button-container">
          <div>
            <div className="button-group-name">Lower Division</div>
            <div className="button-group">
              {renderButton("/COMPSCI10", "CS10")}
              {renderButton("/COMPSCI61A", "CS61A")}
              {renderButton("/COMPSCI47B", "CS47B")}
              {renderButton("/COMPSCI61B", "CS61B")}
              {renderButton("/COMPSCI61C", "CS61C")}
              {renderButton("/COMPSCI70", "CS70")}
            </div>
          </div>
          <div>
            <div className="button-group-name">Upper Division</div>
            <div className="button-group">
              {renderButton("/COMPSCI161", "CS161")}
              {renderButton("/COMPSCI162", "CS162")}
              {renderButton("/COMPSCI168", "CS168")}
              {renderButton("/COMPSCI170", "CS170")}
              {renderButton("/COMPSCI182", "CS182")}
              {renderButton("/COMPSCI184", "CS184")}
              {renderButton("/COMPSCI186", "CS186")}
              {renderButton("/COMPSCI188", "CS188")}
              {renderButton("/COMPSCI189", "CS189")}
            </div>
          </div>
        </div>
      </div>

      <div>
      </div>



      <Routes> {/* Changed from Switch to Routes */}
        <Route path="/COMPSCI10" element={<CS10 />} /> {/* Changed from component to element */}
        <Route path="/COMPSCI61A" element={<CS61A />} />
        <Route path="/COMPSCI47B" element={<CS47B />} />
        <Route path="/COMPSCI61B" element={<CS61B />} />
        <Route path="/COMPSCI61C" element={<CS61C />} />
        <Route path="/COMPSCI70" element={<CS70 />} />
        <Route path="/COMPSCI161" element={<CS161 />} />
        <Route path="/COMPSCI162" element={<CS162 />} />
        <Route path="/COMPSCI168" element={<CS168 />} />
        <Route path="/COMPSCI170" element={<CS170 />} />
        <Route path="/COMPSCI182" element={<CS182 />} />
        <Route path="/COMPSCI184" element={<CS184 />} />
        <Route path="/COMPSCI186" element={<CS186 />} />
        <Route path="/COMPSCI188" element={<CS188 />} />
        <Route path="/COMPSCI189" element={<CS189 />} />
      </Routes>


      <ChatBot className="chatbot component" />
    </Router>

  );
}

export default App;