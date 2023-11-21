import "./App.css";
import Maze from "./Maze/Maze";
import Information from "./Information/Information";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from '@mui/material/useMediaQuery';

import "animate.css";

function App() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "personalwebsite-aa1ff",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: "1:429586287934:web:7b52a255c4c89fa22fb06f",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);

  var state = useMediaQuery('(max-width: 768px)');

  const [open, setOpen] = React.useState(state);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="Maze" id="Maze">
          <Maze database={database} />
        </div>

        <div className="information animate__animated animate__backInRight">
          <Information />
        </div>

        
      </div>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">
            {"Mobile Devices Compatibility"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The website interaction is not compatible with mobile devices, please use a computer to interact with the maze.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Accept
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export default App;
