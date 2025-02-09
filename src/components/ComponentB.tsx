'use client'

import { useContext } from 'react';
import { useAppContext } from '../contexts/index';

export function ComponentB() {
  const { mode } = useAppContext();

  return <p>Component B sees: <b>{mode}</b></p>;
}