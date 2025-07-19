export function changeImgTagSrc(htmlDoc: HTMLElement) {
  const images = htmlDoc.querySelectorAll("img");

  images.forEach((img) => {
    if (img.complete) {
      img.src = `https://placehold.co/${img.naturalWidth}x${img.naturalHeight}`;
    } else {
      const width = img.width;
      const height = img.height;

      if (width && height) {
        img.src = `https://placehold.co/${width}x${height}`;
      } else {
        img.src = `https://placehold.co/100`;
      }
    }
  });
}

export function changeVideoTagSrc(htmlDoc: HTMLElement) {
  const videos = htmlDoc.querySelectorAll("video");

  videos.forEach((vid) => {
    if (vid.src) {
      vid.src = `https://yoinkui.com/video.mp4`;
    }
  });
}

export function changeSourceTagSrc(htmlDoc: HTMLElement) {
  const sources = htmlDoc.querySelectorAll("source");

  sources.forEach((source) => {
    if (source.type.startsWith("video/")) {
      source.src = "https://yoinkui.com/video.mp4";
    } else {
      // source.src = 'https://placehold.co/100';
      // then it is an audio so add a placeholder audio.
    }
  });
}

export function changeTrackTagSrc(htmlDoc: HTMLElement) {
  const tracks = htmlDoc.querySelectorAll("track");

  tracks.forEach((track) => {
    if (track.src) {
      track.src = `https://placehold.co/100`;
    }
  });
}
