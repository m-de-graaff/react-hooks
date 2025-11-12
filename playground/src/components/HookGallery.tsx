import { Link } from 'react-router-dom';
import { hooks } from '../hooksData';
import './HookGallery.css';

export default function HookGallery() {
  return (
    <div className="hook-gallery">
      <div className="gallery-header">
        <h2>Available Hooks</h2>
        <p>
          Browse and interact with all available React hooks. Click on any hook to see a live demo
          and editable code.
        </p>
      </div>

      <div className="gallery-grid">
        {hooks.map((hook) => (
          <Link key={hook.name} to={`/hooks/${hook.name}`} className="hook-card">
            <div className="hook-card-header">
              <h3>{hook.name}</h3>
            </div>
            <p className="hook-card-description">{hook.description}</p>
            <div className="hook-card-footer">
              <span className="hook-card-badge">Try it</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
