import React from 'react';
import axios from 'axios';

const RunBiddingButton = () => {
  const runBidding = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/requests/run-bidding');
      alert('Bidding complete. Check request list.');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Error running bidding process');
    }
  };

  return <button onClick={runBidding}>Run Bidding</button>;
};

export default RunBiddingButton;
