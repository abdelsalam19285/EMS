"use client";

import { useState, useEffect } from 'react';

// YouTube video playlist component
export default function YouTubePlaylist({ videos, onVideoSelect }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState({});

  // Initialize video progress from localStorage if available
  useEffect(() => {
    const savedProgress = localStorage.getItem('videoProgress');
    if (savedProgress) {
      try {
        setVideoProgress(JSON.parse(savedProgress));
      } catch (err) {
        console.error('Error parsing saved video progress:', err);
      }
    }
  }, []);

  // Save video progress to localStorage when it changes
  useEffect(() => {
    if (Object.keys(videoProgress).length > 0) {
      localStorage.setItem('videoProgress', JSON.stringify(videoProgress));
    }
  }, [videoProgress]);

  // Handle video progress update
  const handleVideoProgress = (progress) => {
    setVideoProgress(prev => ({
      ...prev,
      [progress.videoId]: {
        currentTime: progress.currentTime,
        duration: progress.duration,
        percent: progress.percent,
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  // Handle video selection
  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
    if (onVideoSelect) {
      onVideoSelect(videos[index], index);
    }
  };

  // Get progress for a specific video
  const getVideoProgress = (videoId) => {
    return videoProgress[videoId] || { percent: 0 };
  };

  // Check if a video is completed (>95% watched)
  const isVideoCompleted = (videoId) => {
    const progress = getVideoProgress(videoId);
    return progress.percent > 95;
  };

  return (
    <div className="youtube-playlist">
      <h3 className="text-lg font-medium mb-3">Course Videos</h3>
      
      <div className="border border-gray-200 rounded-lg divide-y">
        {videos.map((video, index) => (
          <div 
            key={video.id || index}
            onClick={() => handleVideoSelect(index)}
            className={`p-3 flex items-center hover:bg-gray-50 cursor-pointer ${
              currentVideoIndex === index ? 'bg-amber-50' : ''
            }`}
          >
            <div className="mr-3 text-gray-500">
              {index + 1}.
            </div>
            
            <div className="flex-grow">
              <div className="font-medium">{video.title || `Lecture ${index + 1}`}</div>
              
              <div className="flex items-center mt-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                  <div 
                    className={`h-1.5 rounded-full ${
                      isVideoCompleted(video.id) ? 'bg-green-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${getVideoProgress(video.id).percent || 0}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {Math.round(getVideoProgress(video.id).percent || 0)}%
                </span>
              </div>
            </div>
            
            {isVideoCompleted(video.id) && (
              <div className="ml-2 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
