//styles
import {Start} from './Start';
import {useState} from 'react';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
};

const starContainerStyle = {
  display: 'flex',
};

const textStyle = {
  lineHeight: '1',
  margin: '0'
};

export const StarRating = ({maxRating = 5}) => {

  //states
  const [rating, setRating] = useState(1);

  //functions
  function handleSetRating(rating) {
    setRating(rating);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({length: maxRating}, (_, i) => {
          return <Start key={i} onRate={() => handleSetRating(i + 1)} full={rating >= i + 1}/>;
        })}
      </div>
      <p style={textStyle}>{rating || ''}</p>
    </div>
  );
};

