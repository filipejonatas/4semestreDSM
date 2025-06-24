// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button {
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #007bff #f1f1f1;
  }

  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb {
    background: #007bff;
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
  }
`;