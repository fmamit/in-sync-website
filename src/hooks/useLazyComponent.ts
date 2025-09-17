import { useState, useEffect, useRef } from 'react';

interface LazyComponentOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook for lazy loading components based on intersection observer
 * Helps improve performance by loading components only when needed
 */
export const useLazyComponent = (options: LazyComponentOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    elementRef,
    isVisible,
    hasLoaded,
    shouldLoad: triggerOnce ? hasLoaded : isVisible
  };
};

/**
 * Hook for lazy loading with delay
 * Useful for components that should load after a certain delay
 */
export const useLazyWithDelay = (delay: number = 1000) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return shouldLoad;
};

/**
 * Hook for conditional lazy loading
 * Loads component based on user interaction or specific conditions
 */
export const useConditionalLazy = (condition: boolean) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (condition && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [condition, shouldLoad]);

  return shouldLoad;
};