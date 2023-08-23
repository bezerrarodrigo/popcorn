import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {StarRating} from './components/StarRating';
// import './index.css';
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <StarRating maxRating={5} defaultRating={1}
                messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}/>
    <StarRating className="test" maxRating={10} color="orange" size={32}
                defaultRating={3}/>
    <Test/>
  </React.StrictMode>
);


function Test() {
  
  const [rating, setRating] = useState(0);
  
  return (
    <div>
      <StarRating onSetRating={setRating}/>
      <p>This movie received {rating} stars from the critics. </p>
    </div>
  );
}