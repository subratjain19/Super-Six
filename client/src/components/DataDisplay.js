import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfoTable = () => {
  const [info, setInfo] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/data?page=${activePage}`);
        setInfo(response.data.data);
        setPageCount(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [activePage]);

  const changePage = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div>
      <table>
        <tbody>
          {info.map((record, idx) => (
            <tr key={idx}>
              <td>{record.CreditScore}</td>
              <td>{record.CreditLines}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...Array(pageCount).keys()].map((num) => (
          <button key={num} onClick={() => changePage(num + 1)}>
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InfoTable;
