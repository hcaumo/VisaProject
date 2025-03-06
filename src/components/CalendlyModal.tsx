'use client';

import { useEffect, useState } from 'react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyUrl: string;
}

export const CalendlyModal = ({ isOpen, onClose, calendlyUrl }: CalendlyModalProps) => {
  const [mounted, setMounted] = useState(false);

  // Only render the modal on the client side
  useEffect(() => {
    setMounted(true);
    
    // Add event listener to close modal on escape key
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      window.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative h-[80vh] w-full max-w-4xl rounded-lg bg-white">
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <iframe
          src={calendlyUrl}
          className="h-full w-full rounded-lg"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};