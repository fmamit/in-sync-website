import { useEffect, useState, useRef } from "react";

interface UseLazyLoadingProps<T> {
  items: T[];
  initialCount?: number;
  loadIncrement?: number;
}

export const useLazyLoading = <T>({ 
  items, 
  initialCount = 4, 
  loadIncrement = 4 
}: UseLazyLoadingProps<T>) => {
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const displayedItems = items.slice(0, displayCount);
  const hasMore = displayCount < items.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + loadIncrement, items.length));
  };

  // Intersection Observer for automatic loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-load more when intersecting
  useEffect(() => {
    if (isIntersecting && hasMore) {
      const timer = setTimeout(() => {
        loadMore();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting, hasMore]);

  // Reset when items change
  useEffect(() => {
    setDisplayCount(initialCount);
  }, [items.length, initialCount]);

  return {
    displayedItems,
    hasMore,
    loadMore,
    loadMoreRef,
    displayCount,
    totalCount: items.length
  };
};