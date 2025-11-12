export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL;

export const pageview = () => {
  window.fbq("track", "ViewContent");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  window.fbq("track", name, options);
};
