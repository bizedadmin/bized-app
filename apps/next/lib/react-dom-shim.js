"use client"
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';

// React 19 moved hydrate, render, and unmountComponentAtNode from 'react-dom'
// These are now in different places
export const hydrate = (...args) => ReactDOMClient.hydrateRoot(args[1], args[0]);
export const render = (children, element) => {
  const root = ReactDOMClient.createRoot(element);
  root.render(children);
  return root;
};
export const unmountComponentAtNode = (element) => {
  // Mocking it as we usually don't need real unmounting on web for RNW initial stages
  return true;
};

// Re-export everything else from the base package
export * from 'react-dom';

// Default export because some packages use import ReactDOM from 'react-dom'
export default {
    ...ReactDOM,
    hydrate,
    render,
    unmountComponentAtNode
};
