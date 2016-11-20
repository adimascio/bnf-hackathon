import React from 'react'
import { Link } from 'react-router'
export default function CorpusPicker() {
  return (
    <div>
      Choose a corpus
      <ul>
        <li>
          <Link to="/people">Visualize corpus #1</Link>
        </li>
        <li>
          <Link to="/places">Visualize corpus #2</Link>
        </li>
      </ul>
    </div>
  )
}