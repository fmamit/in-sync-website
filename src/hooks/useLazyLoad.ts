import { useEffect, useState, useRef, useCallback } from "react";

// Consolidated lazy loading hook that replaces multiple similar implementations

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

interface UseLazyLoadReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  hasLoaded: boolean;
}

// Main lazy loading hook with intersection observer
export const useLazyLoad = (options: UseLazyLoadOptions = {}): UseLazyLoadReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) {
                setHasLoaded(true);
                observer.unobserve(element);
              }
            }, delay);
          } else {
            setIsVisible(true);
            if (triggerOnce) {
              setHasLoaded(true);
              observer.unobserve(element);
            }
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return {
    ref: elementRef,
    isVisible: triggerOnce ? hasLoaded : isVisible,
    hasLoaded
  };
};

// Hook for lazy loading lists with pagination
interface UseLazyListOptions<T> {
  items: T[];
  initialCount?: number;
  loadIncrement?: number;
  threshold?: number;
  rootMargin?: string;
}

interface UseLazyListReturn<T> {
  displayedItems: T[];
  hasMore: boolean;
  loadMore: () => void;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}

export const useLazyList = <T>(options: UseLazyListOptions<T>): UseLazyListReturn<T> => {
  const {
    items,
    initialCount = 4,
    loadIncrement = 4,
    threshold = 0.1,
    rootMargin = '100px'
  } = options;

  const [displayCount, setDisplayCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + loadIncrement, items.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, loadIncrement, items.length]);

  const hasMore = displayCount < items.length;
  const displayedItems = items.slice(0, displayCount);

  // Auto-load more when intersection is observed
  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasMore, isLoading, loadMore, threshold, rootMargin]);

  return {
    displayedItems,
    hasMore,
    loadMore,
    loadMoreRef,
    isLoading
  };
};

// Hook for conditional lazy loading based on user actions
export const useConditionalLazy = (condition: boolean, delay: number = 0): boolean => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (condition && !shouldLoad) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setShouldLoad(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setShouldLoad(true);
      }
    }
  }, [condition, shouldLoad, delay]);

  return shouldLoad;
};

// Hook for lazy loading with retry capability
interface UseLazyLoadWithRetryOptions extends UseLazyLoadOptions {
  maxRetries?: number;
  retryDelay?: number;
}

interface UseLazyLoadWithRetryReturn extends UseLazyLoadReturn {
  retry: () => void;
  retryCount: number;
  hasError: boolean;
}

export const useLazyLoadWithRetry = (
  loadFn: () => Promise<void>,
  options: UseLazyLoadWithRetryOptions = {}
): UseLazyLoadWithRetryReturn => {
  const { maxRetries = 3, retryDelay = 1000, ...lazyOptions } = options;
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  
  const { ref, isVisible, hasLoaded } = useLazyLoad(lazyOptions);

  const executeLoad = useCallback(async () => {
    try {
      setHasError(false);
      await loadFn();
    } catch (error) {
      console.error('Lazy load error:', error);
      setHasError(true);
      
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          executeLoad();
        }, retryDelay);
      }
    }
  }, [loadFn, retryCount, maxRetries, retryDelay]);

  const retry = useCallback(() => {
    setRetryCount(0);
    setHasError(false);
    executeLoad();
  }, [executeLoad]);

  useEffect(() => {
    if (isVisible && !hasLoaded && !hasError) {
      executeLoad();
    }
  }, [isVisible, hasLoaded, hasError, executeLoad]);

  return {
    ref,
    isVisible,
    hasLoaded,
    retry,
    retryCount,
    hasError
  };
};

// Pre-built hook for common image lazy loading
export const useLazyImage = (src: string, options: UseLazyLoadOptions = {}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const { ref, isVisible } = useLazyLoad(options);

  useEffect(() => {
    if (isVisible && src && !isLoaded && !hasError) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setHasError(true);
      };
      img.src = src;
    }
  }, [isVisible, src, isLoaded, hasError]);

  return {
    ref,
    src: imageSrc,
    isLoaded,
    hasError,
    isVisible
  };
};