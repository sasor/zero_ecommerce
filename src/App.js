import React from 'react';
import { APP_URL } from './env';

function App() {
  return (
    <div className="grid-container">
      <header>
        <a href={APP_URL}>React Shopping Cart</a>
      </header>
      <main>
        Product list
      </main>
      <footer>
        All right is reserved.
      </footer>
    </div>
  );
}

export default App;
