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
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  //functions
  function handleSetRating(rating) {
    setRating(rating);
  }

  function handleMouseIn(index) {
    setTempRating(index + 1);
  }

  function handleMouseOut() {
    setTempRating(0);
  }


  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({length: maxRating}, (_, i) => {
          return <Start key={i}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onRate={() => handleSetRating(i + 1)}
                        onHoverIn={() => handleMouseIn(i)}
                        onHoverOut={() => handleMouseOut()}/>;
        })}
      </div>
      <p style={textStyle}>{tempRating || rating || ''}</p>
    </div>
  );
};

