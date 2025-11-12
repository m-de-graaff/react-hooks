import { Link, useNavigate, useParams } from 'react-router-dom';
import { hooks } from '../hooksData';
import Playground from './Playground';
import './HookDemo.css';

export default function HookDemo() {
  const { hookName } = useParams<{ hookName: string }>();
  const navigate = useNavigate();

  const hook = hooks.find((h) => h.name === hookName);

  if (!hook) {
    return (
      <div className="hook-demo-error">
        <h2>Hook not found</h2>
        <p>The hook "{hookName}" does not exist.</p>
        <Link to="/">← Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <button type="button" onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <div className="hook-demo-title">
          <h1>{hook.name}</h1>
          <p className="hook-demo-description">{hook.description}</p>
        </div>
        <a
          href={`https://github.com/m-de-graaff/react-hooks/blob/main/src/hooks/${hook.name}.ts`}
          target="_blank"
          rel="noopener noreferrer"
          className="source-button"
        >
          View Source
        </a>
      </div>

      <div className="hook-demo-content">
        <Playground code={hook.example} scope={hook.scope} />
      </div>

      <div className="hook-demo-install">
        <h3>Install</h3>
        <code className="install-code">npm install @m-de-graaff/react-hooks</code>
        <h3>Import</h3>
        <code className="install-code">
          import {'{'} {hook.name} {'}'} from '@m-de-graaff/react-hooks';
        </code>
      </div>
    </div>
  );
}
