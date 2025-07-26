export const safeRequestIdleCallback =
  window.requestIdleCallback ||
  function (cb) {
    return setTimeout(
      () => cb({ didTimeout: false, timeRemaining: () => 0 }),
      1
    );
  };
