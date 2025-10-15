'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadedResources, setLoadedResources] = useState(0);
  const [totalResources, setTotalResources] = useState(0);

  useEffect(() => {
    const trackResourceLoading = () => {
      // Get all media elements (videos, images, audio)
      const videos = Array.from(document.querySelectorAll('video'));
      const images = Array.from(document.querySelectorAll('img'));
      const audios = Array.from(document.querySelectorAll('audio'));
      
      const allResources = [...videos, ...images, ...audios];
      const total = allResources.length;
      
      setTotalResources(total);
      
      if (total === 0) {
        // No media resources found, complete immediately
        setProgress(100);
        setTimeout(() => onLoadComplete(), 500);
        return;
      }

      let loaded = 0;

      const updateProgress = () => {
        loaded++;
        setLoadedResources(loaded);
        const progressPercent = Math.round((loaded / total) * 100);
        setProgress(progressPercent);
        
        if (loaded >= total) {
          setTimeout(() => onLoadComplete(), 500);
        }
      };

      // Track video loading
      videos.forEach(video => {
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
          updateProgress();
        } else {
          video.addEventListener('canplaythrough', updateProgress, { once: true });
          video.addEventListener('error', updateProgress, { once: true });
        }
      });

      // Track image loading
      images.forEach(img => {
        if (img.complete) {
          updateProgress();
        } else {
          img.addEventListener('load', updateProgress, { once: true });
          img.addEventListener('error', updateProgress, { once: true });
        }
      });

      // Track audio loading
      audios.forEach(audio => {
        if (audio.readyState >= 3) {
          updateProgress();
        } else {
          audio.addEventListener('canplaythrough', updateProgress, { once: true });
          audio.addEventListener('error', updateProgress, { once: true });
        }
      });
    };

    // Wait for DOM to be ready then track resources
    const timer = setTimeout(() => {
      trackResourceLoading();
    }, 100);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.content}>
        <img src="/logo.svg" alt="Logo" className={styles.logo} />
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
