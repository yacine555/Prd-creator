// components/ComponentC.tsx
'use client'

import React from 'react';
import { useFormContext } from '@/contexts/PrdFormContext';

export function ComponentC() {
  const { submittedData } = useFormContext();

  if (!submittedData) {
    return <p>No data submitted yet.</p>;
  }

  return (
    <div>
      <h2>Submitted Data:</h2>
      <ul>
        {Object.entries(submittedData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}