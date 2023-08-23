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


export const StarRating = ({
  maxRating = 5,
  color = '#fcc419',
  size = 24,
  className = '',
  messages = [],
  defaultRating = 0,
  onSetRating,
}) => {
  
  //states
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  
  //functions
  function handleSetRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }
  
  function handleMouseIn(index) {
    setTempRating(index + 1);
  }
  
  function handleMouseOut() {
    setTempRating(0);
  }
  
  //styles
  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size}px`,
  };
  
  
  return (
    <div className={className} style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({length: maxRating}, (_, i) => {
          return <Start key={i} color={color} size={size}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onRate={() => handleSetRating(i + 1)}
                        onHoverIn={() => handleMouseIn(i)}
                        onHoverOut={() => handleMouseOut()}/>;
        })}
      </div>
      <p
        style={textStyle}>{messages.length === maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ''}</p>
    </div>
  );
};

