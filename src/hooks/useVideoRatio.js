import React from 'react'


export default function useVideoRatio(unit = 40, rowHeight = 30) {
  return React.useCallback(({ url, w }, callback, errorCallback) => {
    const video = document.createElement('video');
    video.src = url;
    video.load();

    video.addEventListener('loadeddata', function () {
      try {
        // console.log('video - onload', url, w, unit, video.videoWidth, video.videoHeight)
        if (w > 0 && unit > 0 && video.videoHeight > 0 && video.videoWidth > 0)
          callback(1 + Math.floor((w * video.videoHeight / video.videoWidth - rowHeight) / unit));
      } catch (error) {
        errorCallback(error)
      }
    })
    video.onerror = () => { errorCallback('loading error') }
  }, [unit, rowHeight]);
}