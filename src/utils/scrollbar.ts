/**
 * Global Scrollbar Visibility Management
 * 
 * This utility manages the dynamic visibility of custom scrollbars across the application.
 * Features:
 * - Shows scrollbar during active scrolling with debounced hiding
 * - Shows scrollbar when mouse hovers near the right edge of the screen
 * - Smooth fade-in/fade-out transitions
 * - Cross-browser compatibility
 * - Performance optimized with debouncing and throttling
 */

// Configuration constants
const SCROLL_HIDE_DELAY = 2500; // ms - Extended delay for better UX (2.5 seconds)
const HOVER_EDGE_THRESHOLD = 50; // pixels from right edge
const THROTTLE_DELAY = 16; // ~60fps for smooth performance

// State management
let scrollTimeout: NodeJS.Timeout | null = null;
let hoverTimeout: NodeJS.Timeout | null = null;
let isScrolling = false;
let isHovering = false;
let lastScrollTime = 0;
let lastMouseMoveTime = 0;

/**
 * Shows the custom scrollbar by adding the show-scrollbar class
 */
const showScrollbar = (): void => {
  document.documentElement.classList.add('show-scrollbar');
};

/**
 * Hides the custom scrollbar by removing the show-scrollbar class
 */
const hideScrollbar = (): void => {
  document.documentElement.classList.remove('show-scrollbar');
};

/**
 * Throttle function to limit the frequency of function calls
 */
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return function (this: any, ...args: any[]) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

/**
 * Handles scroll events with debounced hiding logic
 */
const handleScroll = (): void => {
  const currentTime = Date.now();
  
  // Throttle scroll events for performance
  if (currentTime - lastScrollTime < THROTTLE_DELAY) {
    return;
  }
  lastScrollTime = currentTime;

  // Show scrollbar immediately when scrolling starts
  if (!isScrolling) {
    isScrolling = true;
    showScrollbar();
  }

  // Clear existing timeout
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  // Set new timeout to hide scrollbar after delay
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    // Only hide if not hovering near edge
    if (!isHovering) {
      hideScrollbar();
    }
  }, SCROLL_HIDE_DELAY);
};

/**
 * Handles mouse movement for edge hover detection
 */
const handleMouseMove = (event: MouseEvent): void => {
  const currentTime = Date.now();
  
  // Throttle mouse move events for performance
  if (currentTime - lastMouseMoveTime < THROTTLE_DELAY) {
    return;
  }
  lastMouseMoveTime = currentTime;

  const { clientX } = event;
  const windowWidth = window.innerWidth;
  const distanceFromRightEdge = windowWidth - clientX;

  const wasHovering = isHovering;
  isHovering = distanceFromRightEdge <= HOVER_EDGE_THRESHOLD;

  // Show scrollbar when hovering near right edge
  if (isHovering && !wasHovering) {
    showScrollbar();
    
    // Clear any existing hover timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  }
  
  // Hide scrollbar when moving away from edge (with delay)
  if (!isHovering && wasHovering) {
    // Clear any existing hover timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    // Only hide if not actively scrolling
    hoverTimeout = setTimeout(() => {
      if (!isScrolling && !isHovering) {
        hideScrollbar();
      }
    }, 200); // Shorter delay for hover to prevent flickering
  }
};

/**
 * Handles touch events for mobile devices
 */
const handleTouchStart = (): void => {
  if (!isScrolling) {
    isScrolling = true;
    showScrollbar();
  }
};

const handleTouchEnd = (): void => {
  // Clear existing timeout
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  // Set timeout to hide scrollbar after touch ends
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    hideScrollbar();
  }, SCROLL_HIDE_DELAY);
};

/**
 * Throttled event handlers for performance optimization
 */
const throttledHandleScroll = throttle(handleScroll, THROTTLE_DELAY);
const throttledHandleMouseMove = throttle(handleMouseMove, THROTTLE_DELAY);

/**
 * Sets up global scrollbar visibility management
 * @returns Cleanup function to remove event listeners
 */
export const setupGlobalScrollbarVisibility = (): (() => void) => {
  // Add event listeners
  window.addEventListener('scroll', throttledHandleScroll, { passive: true });
  window.addEventListener('mousemove', throttledHandleMouseMove, { passive: true });
  
  // Mobile touch events
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Handle window resize to recalculate hover threshold
  const handleResize = throttle(() => {
    // Force recalculation on next mouse move
    lastMouseMoveTime = 0;
  }, 250);
  
  window.addEventListener('resize', handleResize, { passive: true });

  // Cleanup function
  return () => {
    // Remove event listeners
    window.removeEventListener('scroll', throttledHandleScroll);
    window.removeEventListener('mousemove', throttledHandleMouseMove);
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
    window.removeEventListener('resize', handleResize);

    // Clear timeouts
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
      scrollTimeout = null;
    }
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }

    // Reset state
    isScrolling = false;
    isHovering = false;
    
    // Hide scrollbar
    hideScrollbar();
  };
};

/**
 * Force show scrollbar (useful for debugging or special cases)
 */
export const forceShowScrollbar = (): void => {
  showScrollbar();
};

/**
 * Force hide scrollbar (useful for debugging or special cases)
 */
export const forceHideScrollbar = (): void => {
  hideScrollbar();
};

/**
 * Check if scrollbar is currently visible
 */
export const isScrollbarVisible = (): boolean => {
  return document.documentElement.classList.contains('show-scrollbar');
};