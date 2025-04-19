import React from 'react';
import SubmitRequestForm from './components/SubmitRequestForm';
import RequestsList from './components/RequestsList';
import RunBiddingButton from './components/RunBiddingButton';

function App() {
  return (
    <div style={{ padding: '30px' }}>
      <h1>AI Bidding System</h1>
      <SubmitRequestForm />
      <hr />
      <RequestsList />
      <br />
      <RunBiddingButton />
    </div>
  );
}

export default App;
