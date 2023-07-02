import React, { useState, useEffect } from 'react';

const UserAppointmentList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7150/api/Appointments');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://localhost:7150/api/Appointments/${id}`, {
        method: 'DELETE',
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  return (
    <div className="container">
      <h1>Consultation Request</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Number</th>
            <th>Service</th>
            <th style={{ width: "30%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.number}</td>
              <td>{item.service}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAppointmentList;
