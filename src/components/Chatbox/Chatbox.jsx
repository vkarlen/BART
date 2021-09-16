import React, { useState } from 'react';

import { Button, TextField, Card } from '@mui/material';

function Chatbox() {
  const [Message, setMessage] = useState('');

  return (
    <div className="chat-container">
      <div className="chat-head">
        <div>
          <h5>Bart</h5>
        </div>
      </div>

      <div className="chat-body">
        <ul className="chat-window">
          <li>
            <div className="chat-card">
              <p>Hello. My name is Bart. How can I help you?</p>
            </div>
          </li>
        </ul>

        <form onSubmit={(e) => {}} className="input-container">
          <TextField
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => setMessage(e.target.value)}
            value={Message}
            fullWidth
          />

          <Button variant="contained" onClick={() => {}} fullWidth>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Chatbox;
