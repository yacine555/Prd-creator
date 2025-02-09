'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FormData {
  [key: string]: string;
}

interface FormContextType {
  formData: FormData;
  submittedData: FormData | null;
  updateFormData: (field: string, value: string) => void;
  submitForm: () => void;
}

const FormContext = createContext<FormContextType | null>(null);

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const submitForm = () => {
    setSubmittedData(formData);
    setFormData({}); // Reset form after submission
  };

  return (
    <FormContext.Provider value={{ formData, submittedData, updateFormData, submitForm }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};