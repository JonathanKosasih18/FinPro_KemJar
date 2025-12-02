import { useState } from 'react';
import './Home.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Home() {
  const [targetUrl, setTargetUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrackAndGo = () => {
    if (!targetUrl) {
      alert('Please enter a URL');
      return;
    }
    window.location.href = `${API_URL}/track-and-go?target_url=${encodeURIComponent(targetUrl)}`;
  };

  const handleStatusCheck = async () => {
    setLoading(true);
    setStatusMessage('Checking...');

    try {
      const response = await fetch(`${API_URL}/status-check?difficulty=10`);
      const data = await response.json();
      setStatusMessage(`Online - Response time: ${data.processingTime}`);
    } catch (error) {
      setStatusMessage('Error: Server unreachable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <header>
        <h1>Link Tracker Dashboard</h1>
      </header>

      <div className="sections">
        <section className="link-tracker">
          <h2>Link Tracker</h2>
          <p>Track clicks and redirect to any URL</p>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter URL to redirect to..."
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
            />
            <button onClick={handleTrackAndGo}>Go</button>
          </div>
        </section>

        <section className="system-status">
          <h2>System Status</h2>
          <p>Check if the server is responding</p>
          <button
            onClick={handleStatusCheck}
            disabled={loading}
            className="status-btn"
          >
            {loading ? 'Checking...' : 'Check Status'}
          </button>
          {statusMessage && (
            <div className="status-message">{statusMessage}</div>
          )}
        </section>
      </div>

      <footer>
        <a href="/attack">Admin Console</a>
      </footer>
    </div>
  );
}

export default Home;
