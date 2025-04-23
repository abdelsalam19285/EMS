"use client";

import React, { useState, useEffect } from 'react';

// YouTube video player component
export default function YouTubePlayer({ videoId, onProgress, autoplay = false }) {
  const [player, setPlayer] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const [progressInterval, setProgressInterval] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load YouTube API
  useEffect(() => {
    // Only load the API if it hasn't been loaded already
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsLoaded(true);
      };
    } else {
      setIsLoaded(true);
    }

    // Clean up
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, []);

  // Initialize player when API is loaded and videoId is available
  useEffect(() => {
    if (isLoaded && videoId) {
      initializePlayer();
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [isLoaded, videoId]);

  // Initialize the YouTube player
  const initializePlayer = () => {
    try {
      const newPlayer = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId: videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });

      setPlayer(newPlayer);
    } catch (err) {
      setError('Error initializing YouTube player');
      console.error(err);
    }
  };

  // Handle player ready event
  const onPlayerReady = (event) => {
    setDuration(event.target.getDuration());
  };

  // Handle player state change event
  const onPlayerStateChange = (event) => {
    // YT.PlayerState.PLAYING = 1
    if (event.data === 1) {
      // Start tracking progress when video is playing
      const interval = setInterval(() => {
        if (player && player.getCurrentTime) {
          const time = player.getCurrentTime();
          setCurrentTime(time);
          
          // Call the onProgress callback if provided
          if (onProgress) {
            onProgress({
              videoId,
              currentTime: time,
              duration: player.getDuration(),
              percent: (time / player.getDuration()) * 100,
            });
          }
        }
      }, 1000);
      
      setProgressInterval(interval);
    } else {
      // Clear interval when video is paused or ended
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
    }
  };

  // Handle player error event
  const onPlayerError = (event) => {
    setError(`YouTube player error: ${event.data}`);
  };

  // Format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="youtube-player-container">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="aspect-video bg-black relative">
        <div id={`youtube-player-${videoId}`} className="w-full h-full"></div>
      </div>
      
      <div className="mt-2 text-sm text-gray-600 flex justify-between">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      <div className="mt-1 bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-amber-500 h-2.5 rounded-full" 
          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
        ></div>
      </div>
    </div>
  );
}
