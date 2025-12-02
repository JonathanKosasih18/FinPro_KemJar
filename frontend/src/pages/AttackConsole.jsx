import { useState } from 'react';
import './AttackConsole.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function AttackConsole() {
  const [intensity, setIntensity] = useState(45);
  const [attackStatus, setAttackStatus] = useState('');
  const [isAttacking, setIsAttacking] = useState(false);

  const launchAttack = async () => {
    setIsAttacking(true);
    setAttackStatus(`Launching DoS attack with intensity ${intensity}...`);

    const startTime = Date.now();

    try {
      const response = await fetch(`${API_URL}/status-check?difficulty=${intensity}`);
      const data = await response.json();
      const endTime = Date.now();

      setAttackStatus(
        `Attack completed. Server responded in ${endTime - startTime}ms. ` +
        `(Server reported: ${data.processingTime})`
      );
    } catch (error) {
      setAttackStatus(`Attack may have succeeded - Server is unresponsive: ${error.message}`);
    } finally {
      setIsAttacking(false);
    }
  };

  return (
    <div className="attack-container">
      <header>
        <h1>🔴 Attack Console</h1>
        <p className="warning">⚠️ For Educational Purposes Only</p>
      </header>

      <section className="attack-panel">
        <h2>Application-Layer DoS Attack</h2>
        <p>
          This attack exploits the computationally expensive Fibonacci calculation
          to freeze the server's event loop.
        </p>

        <div className="control-group">
          <label htmlFor="intensity">
            Attack Intensity (Fibonacci N):
            <span className="value">{intensity}</span>
          </label>
          <input
            id="intensity"
            type="range"
            min="30"
            max="50"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            disabled={isAttacking}
          />
          <div className="intensity-guide">
            <span>Low (30)</span>
            <span>Medium (40)</span>
            <span>High (50)</span>
          </div>
        </div>

        <button
          onClick={launchAttack}
          disabled={isAttacking}
          className="attack-btn"
        >
          {isAttacking ? '🔄 Attacking...' : '🚀 Launch Attack'}
        </button>

        {attackStatus && (
          <div className={`attack-status ${isAttacking ? 'active' : ''}`}>
            {attackStatus}
          </div>
        )}
      </section>

      <section className="info-panel">
        <h3>How This Works</h3>
        <ul>
          <li>
            <strong>Open Redirect:</strong> The <code>/track-and-go</code> endpoint
            redirects to any URL without validation, allowing phishing attacks.
          </li>
          <li>
            <strong>DoS Attack:</strong> The <code>/status-check</code> endpoint
            uses recursive Fibonacci calculation, blocking Node.js event loop with high values.
          </li>
          <li>
            <strong>Impact:</strong> Setting intensity to 45+ will make the server
            unresponsive for several seconds, blocking all other requests.
          </li>
        </ul>
      </section>

      <footer>
        <a href="/">← Back to Dashboard</a>
      </footer>
    </div>
  );
}

export default AttackConsole;
