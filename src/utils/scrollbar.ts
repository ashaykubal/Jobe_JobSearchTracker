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
const SCROLL_HIDE_DELAY = 2000; // ms - Delay before hiding scrollbar (2 seconds)
const HOVER_EDGE_THRESHOLD = 50; // pixels from right edge

// State management
let scrollTimeout: NodeJS.Timeout | null = null;
let hoverTimeout: NodeJS.Timeout | null = null;
let isScrolling = false;
let isHovering = false;

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
 * Handles scroll events with debounced hiding logic (no throttling)
 */
const handleScroll = (): void => {
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
 * Handles mouse movement for edge hover detection (no throttling)
 */
const handleMouseMove = (event: MouseEvent): void => {
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
 * Sets up global scrollbar visibility management
 * @returns Cleanup function to remove event listeners
 */
export const setupGlobalScrollbarVisibility = (): (() => void) => {
  // Add event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  
  // Mobile touch events
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Handle window resize to recalculate hover threshold
  const handleResize = () => {
    // Reset hover state on resize to recalculate edge detection
    if (isHovering && !isScrolling) {
      hideScrollbar();
      isHovering = false;
    }
  };
  
  window.addEventListener('resize', handleResize, { passive: true });

  // Cleanup function
  return () => {
    // Remove event listeners
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousemove', handleMouseMove);
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