import React, { useEffect, useState } from 'react';
import './snippets.css';
import axios from 'axios';

function Page2() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://code-submission-b9z6b7dkp-swaraj-kumars-projects.vercel.app/snippets");
        setEntries(response.data.reverse()); // Reverse the entries to display latest first
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="page2-container">
      <h2>Submitted Entries</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Code Language</th>
            <th>Standard Input</th>
            <th>Source Code (First 100 Characters)</th>
            <th>Timestamp</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.code_language}</td>
              <td>{entry.stdin}</td>
              <td>{entry.source_code_short && entry.source_code_short.slice(0, 100)}</td>
              <td>{entry.timestamp}</td>
              <td>{entry.out_t}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={nextPage} disabled={indexOfLastEntry >= entries.length}>Next Page</button>
      </div>
    </div>
  );
}

export default Page2;
