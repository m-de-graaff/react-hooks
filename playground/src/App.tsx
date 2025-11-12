import { Link, Route, Routes, useLocation } from 'react-router-dom';
import HookDemo from './components/HookDemo';
import HookGallery from './components/HookGallery';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <Link to="/" className="logo">
            <h1>React Hooks Playground</h1>
          </Link>
          <nav>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Gallery
            </Link>
            <a
              href="https://github.com/m-de-graaff/react-hooks"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@m-de-graaff/react-hooks"
              target="_blank"
              rel="noopener noreferrer"
            >
              npm
            </a>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HookGallery />} />
          <Route path="/hooks/:hookName" element={<HookDemo />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>
            Built with{' '}
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              React
            </a>{' '}
            and{' '}
            <a
              href="https://github.com/FormidableLabs/react-live"
              target="_blank"
              rel="noopener noreferrer"
            >
              react-live
            </a>
            . Deployed on{' '}
            <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer">
              GitHub Pages
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
