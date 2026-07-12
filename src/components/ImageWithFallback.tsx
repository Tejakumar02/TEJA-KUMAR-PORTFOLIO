import { useState } from 'react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  fallbackIcon: string;
  classNameBg?: string;
  classNameFg?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackIcon,
  classNameBg = 'proj-img-bg',
  classNameFg = 'proj-img-fg'
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(!src);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-center select-none"
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: '2.4rem',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {fallbackIcon}
      </div>
    );
  }

  return (
    <>
      <img
        className={classNameBg}
        src={src}
        alt=""
        aria-hidden="true"
        onError={() => setHasError(true)}
      />
      <img
        className={classNameFg}
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
      />
    </>
  );
}
