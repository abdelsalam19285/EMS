"use client";

import { useState } from 'react';
import YouTubePlayer from '@/components/YouTubePlayer';
import YouTubePlaylist from '@/components/YouTubePlaylist';

// Course video player page component
export default function CourseVideoPlayer({ courseId, videos }) {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  
  // Handle video selection from playlist
  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
  };
  
  // Handle video progress update
  const handleVideoProgress = (progress) => {
    // This could be used to save progress to a database in a real implementation
    console.log('Video progress:', progress);
  };
  
  return (
    <div className="course-video-player">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            {currentVideo.title || 'Course Video'}
          </h2>
          
          <YouTubePlayer 
            videoId={currentVideo.id} 
            onProgress={handleVideoProgress}
          />
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-700">
              {currentVideo.description || 'No description available for this video.'}
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Resources</h3>
            {currentVideo.resources && currentVideo.resources.length > 0 ? (
              <div className="border border-gray-200 rounded-lg divide-y">
                {currentVideo.resources.map((resource, index) => (
                  <div key={index} className="p-3 flex justify-between items-center">
                    <span>{resource.name}</span>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No additional resources for this video.</p>
            )}
          </div>
        </div>
        
        <div>
          <YouTubePlaylist 
            videos={videos} 
            onVideoSelect={handleVideoSelect}
          />
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Discussion</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="mb-4">
                Join the course discussion group on Session app to collaborate with other students and ask questions.
              </p>
              <a 
                href={`https://session.org/group/course-${courseId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded inline-block transition-colors"
              >
                Join Session Group
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
