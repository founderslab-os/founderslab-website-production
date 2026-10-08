import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageLoader.css';
import './PageLoader.mobile.css';

interface PageLoaderProps {
  customLogoUrl?: string;
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  customLogoUrl = '/logo.jpeg',
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Progress line animation sequence (~3s total duration)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly towards 100% but slightly slower
        const diff = Math.random() * 8 + 4;
        return Math.min(prev + diff, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Longer pause at 100% before triggering vertical reveal transition to allow reading
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleExitComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="page-loader-overlay"
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // Institutional smooth exponential curve
            },
          }}
          role="dialog"
          aria-label="Loading FoundersLab"
          aria-busy="true"
        >
          <div className="page-loader-content">
            {/* Stage 02: Logo Reveal */}
            <div className="page-loader-logo-wrap">
              <motion.img
                src={customLogoUrl}
                alt="FoundersLab Logo"
                className="page-loader-logo"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.15,
                  ease: [0.25, 1, 0.5, 1],
                }}
              />

              {/* Micro-interaction Line */}
              <motion.div
                className="page-loader-logo-accent"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Stage 03: Tagline */}
            <motion.h1
              className="page-loader-tagline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.95,
                ease: 'easeOut',
              }}
            >
              From Ideas to Enterprises.<br />
              From Campuses to Impact.
            </motion.h1>

            {/* Stage 03 Optional: Descriptor */}
            <motion.div
              className="page-loader-descriptor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.15,
                ease: 'easeOut',
              }}
            >
              <span>INNOVATION</span>
              <span className="page-loader-bullet">•</span>
              <span>ENTREPRENEURSHIP</span>
              <span className="page-loader-bullet">•</span>
              <span>VENTURE BUILDING</span>
            </motion.div>

            {/* Stage 04: Minimal Timeline Progress */}
            <motion.div
              className="page-loader-progress-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.25 }}
            >
              <div
                className="page-loader-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
