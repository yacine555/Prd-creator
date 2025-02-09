// components/MyForm.tsx
'use client'

import React from 'react';
import { useFormContext } from '@/contexts/PrdFormContext';

export function MyForm() {
  const { formData, updateFormData, submitForm } = useFormContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="industry"
        value={formData.industry || ''}
        onChange={(e) => updateFormData('industry', e.target.value)}
        placeholder="industry"
      />
      <input
        type="text"
        name="company"
        value={formData.company || ''}
        onChange={(e) => updateFormData('company', e.target.value)}
        placeholder="company"
      />
      <input
        type="text"
        name="description"
        value={formData.description || ''}
        onChange={(e) => updateFormData('description', e.target.value)}
        placeholder="description"
      />
      <input
        type="text"
        name="strategy"
        value={formData.strategy || ''}
        onChange={(e) => updateFormData('strategy', e.target.value)}
        placeholder="strategy"
      />
      <input
        type="text"
        name="persona"
        value={formData.persona || ''}
        onChange={(e) => updateFormData('persona', e.target.value)}
        placeholder="persona"
      />
      <input
        type="text"
        name="feature"
        value={formData.feature || ''}
        onChange={(e) => updateFormData('feature', e.target.value)}
        placeholder="feature"
      />

      <button type="submit">Submit</button>
    </form>
  );
}