'use client'

import { useContext } from 'react';
import { useAppContext } from '../contexts/index';

export function ComponentA() {
  const { mode, setMode } = useAppContext();
  return (
    <div>
      <p>Mode value: <b>{mode}</b></p>
      <button onClick={() => setMode('new value from A')}>
        Update from A
      </button>
    </div>
  );
}