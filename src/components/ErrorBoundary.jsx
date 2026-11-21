import { Component } from "react";

const CHUNK_ERROR = /dynamically imported module|Loading chunk|Importing a module script failed|error loading dynamically/i;

// If a page file cannot be loaded (for example right after a new deploy), reload once automatically
// instead of staying on "Loading..." forever.
export function reloadOnce() {
  try {
    if (sessionStorage.getItem("tp_reloaded")) return false;
    sessionStorage.setItem("tp_reloaded", "1");
  } catch {}
  window.location.reload();
  return true;
}

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { if (CHUNK_ERROR.test(String(error?.message || error))) reloadOnce(); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="container section center">
        <h1>Something went wrong</h1>
        <p>The page could not load. Please try again.</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Reload the page</button>
      </div>
    );
  }
}
