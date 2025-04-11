import React, { useState, useEffect } from 'react';
import '../SubmissionsViewer.css';

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  [key: string]: any; // For any additional fields
}

const SubmissionsViewer: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/submissions');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setSubmissions(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch submissions:', err);
        setError('Failed to load submissions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="submissions-container">
        <h2>Contact Submissions</h2>
        <div className="loading-indicator">Loading submissions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="submissions-container">
        <h2>Contact Submissions</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="submissions-container">
        <h2>Contact Submissions</h2>
        <div className="no-submissions">No submissions found.</div>
      </div>
    );
  }

  return (
    <div className="submissions-container">
      <h2>Contact Submissions</h2>
      <div className="submissions-table-wrapper">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.timestamp ? formatDate(submission.timestamp) : 'N/A'}</td>
                <td>{submission.name || 'N/A'}</td>
                <td>{submission.email || 'N/A'}</td>
                <td className="message-cell">{submission.message || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionsViewer;