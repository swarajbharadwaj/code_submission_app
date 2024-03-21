import React from 'react';
import { BrowserRouter, Route,Routes } from "react-router-dom"; // Import BrowserRouter and Route
import CodeSubmissionForm from './components/CodeSubmissionForm';
import Page2 from './components/Snippets';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<CodeSubmissionForm/>}/>
      <Route path="/Snippet" element={<Page2/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}
