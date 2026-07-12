import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayIndex?: number;
  threshold?: number;
  key?: string | number;
}

export default function ScrollReveal({
  children,
  className = '',
  delayIndex = 0,
  threshold = 0.08,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  const delayStyle = {
    transitionDelay: `${(delayIndex % 5) * 0.06}s`
  };

  return (
    <div
      ref={ref}
      style={delayStyle}
      className={`reveal-transition ${isVisible ? 'in' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
