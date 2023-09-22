import React from 'react';
import PropTypes from 'prop-types';
import './CircularProgressBar.css'; // Import the CSS file for animations

interface CircularProgressBarProps {
  progress: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
  // Calculate the remaining part of the dash (gap) explicitly
  const gap = 100 - progress;

  return (
    <div className="circular-progress-bar">
      <svg className="circular-progress-svg" viewBox="0 0 100 100">
        <circle className="circular-progress-track" cx="50" cy="50" r="45"></circle>
        <circle
          className="circular-progress-fill"
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={`${progress} ${gap}`}
        ></circle>
      </svg>
      <div className="circular-progress-label">{progress}%</div>
    </div>
  );
};

CircularProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default CircularProgressBar;
