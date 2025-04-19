import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/requests')
      .then(res => setRequests(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Power Requests</h2>
      <table border="1">
        <thead>
          <tr>
            <th>User</th>
            <th>Power</th>
            <th>Bid</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r, i) => (
            <tr key={i}>
              <td>{r.user?.name || 'N/A'}</td>
              <td>{r.requestedPower}</td>
              <td>{r.bidAmount}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsList;
