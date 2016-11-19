import React from 'react'
import { AppBar } from 'react-toolbox/lib/app_bar';

export default function App({ children }) {
  return (
    <div>
      <AppBar>
        <img src="/img/logo.png" />
      </AppBar>
      {/* Children is a special prop name with react. Here, it allows
        `react-router` to populate our main component with the components
        that match the route */}
      <div style={{ padding: 40 }}>
        { children }
      </div>
    </div>
  )
}