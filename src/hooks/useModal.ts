import { useState, useCallback } from 'react';

// Reusable modal state hook to eliminate duplication
export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    setIsOpen
  };
};

// Loading state hook for async operations
export const useLoading = (initialState: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setIsLoading
  };
};

// Submission state hook for forms
export const useSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const startSubmission = useCallback(() => {
    setIsSubmitting(true);
    setIsSubmitted(false);
  }, []);

  const completeSubmission = useCallback(() => {
    setIsSubmitting(false);
    setIsSubmitted(true);
  }, []);

  const failSubmission = useCallback(() => {
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, []);

  const resetSubmission = useCallback(() => {
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, []);

  return {
    isSubmitting,
    isSubmitted,
    startSubmission,
    completeSubmission,
    failSubmission,
    resetSubmission
  };
};