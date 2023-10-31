import "./App.css";
import Maze from "./Maze/Maze";
import Information from "./Information/Information";

import { initializeApp, firebase } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set  } from "firebase/database";
function App() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "personalwebsite-aa1ff",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: "1:612797353750:web:741e76bb6a29d072bcca37",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  }

  
  

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);




  return (
    <div className="App">
      <div className="container">
        <div className="Maze" id="Maze">
          <Maze database={database}/>
        </div>

        <div className="information">
          <Information />
        </div>
      </div>
    </div>
  );
}

export default App;
