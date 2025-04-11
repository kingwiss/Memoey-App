import React from 'react';
import SubmissionsViewer from './SubmissionsViewer';

const SubmissionsRoute: React.FC = () => {
  return (
    <div className="submissions-route">
      <div className="submissions-header">
        <a href="/" className="back-button">← Back to Home</a>
      </div>
      <SubmissionsViewer />
    </div>
  );
};

export default SubmissionsRoute;