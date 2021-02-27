import React from 'react'


export default function useImageRatio(unit = 40, rowHeight = 30) {
  return React.useCallback(({ url, w }, callback, errorCallback) => {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      try {
        console.log('onload', url, w, unit, img.naturalWidth, img.naturalHeight)
        if (w > 0 && unit > 0 && img.naturalHeight > 0 && img.naturalWidth > 0)
          callback(1 + Math.ceil((w * img.naturalHeight / img.naturalWidth - rowHeight) / unit));
      } catch (error) {
        errorCallback(error)
      }
    }
    img.onerror = () => { errorCallback('loading error') }
  }, [unit, rowHeight]);
}