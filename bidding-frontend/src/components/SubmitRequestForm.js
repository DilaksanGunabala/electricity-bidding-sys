import React, { useState } from 'react';
import axios from 'axios';

const SubmitRequestForm = () => {
  const [form, setForm] = useState({
    userId: '',
    requestedPower: '',
    bidAmount: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/requests/submit', form);
      alert('Request submitted!');
    } catch (err) {
      console.error(err);
      alert('Error submitting request');
    }
  };

  return (
    <div>
      <h2>Submit Power Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="number"
          name="requestedPower"
          placeholder="Requested Power"
          value={form.requestedPower}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="number"
          name="bidAmount"
          placeholder="Bid Amount"
          value={form.bidAmount}
          onChange={handleChange}
          required
        /><br/>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default SubmitRequestForm;
