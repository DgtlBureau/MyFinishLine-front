"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Xarrow from "react-xarrows";

type XarrowProps = React.ComponentProps<typeof Xarrow>;

interface ProgressArrowProps extends XarrowProps {
  progress: number;
  showProgressCircle?: boolean;
  circleColor?: string;
  circleRadius?: number;
  circleClassName?: string;
  showText?: boolean;
}

const ProgressArrow: React.FC<ProgressArrowProps> = ({
  progress,
  showProgressCircle = true,
  circleColor = "#ff6b6b",
  circleRadius = 16,
  circleClassName = "",
  showText = true,
  ...xarrowProps
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [svgReady, setSvgReady] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  // Create unique ID for this arrow
  const arrowId = `arrow_${xarrowProps.start}_${xarrowProps.end}`;

  // Store animation state
  const animationStateRef = useRef({
    from: 0,
    to: 0,
    startTime: 0,
    isAnimating: false,
  });

  // Store previous progress in ref AND sessionStorage
  const previousProgressRef = useRef<number>(progress);

  // Easing function for smooth animation
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  // Get circle position from progress percentage
  const getCirclePosition = useCallback((progressValue: number) => {
    if (!pathRef.current || !wrapperRef.current) return null;

    const path = pathRef.current;
    const svg = wrapperRef.current.querySelector("svg");
    if (!path || !svg) return null;

    const totalLength = path.getTotalLength();
    if (totalLength === 0) return null;

    const strokeLength = totalLength * (progressValue / 100);

    try {
      const point = path.getPointAtLength(strokeLength);
      if (!point) return null;

      const svgRect = svg.getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();

      const x = point.x + svgRect.left - wrapperRect.left;
      const y = point.y + svgRect.top - wrapperRect.top;

      return { x, y };
    } catch (error) {
      console.warn("Error getting circle position:", error);
      return null;
    }
  }, []);

  // Apply progress styling to path
  const applyProgressToPath = useCallback(
    (progressValue: number, animate: boolean = false) => {
      if (!pathRef.current) return;

      const path = pathRef.current;
      const totalLength = path.getTotalLength();
      if (totalLength === 0) return;

      const strokeLength = totalLength * (progressValue / 100);

      if (animate) {
        path.style.transition = "stroke-dasharray 1.5s ease-out";
      } else {
        path.style.transition = "none";
      }

      path.style.strokeDasharray = `${strokeLength} ${totalLength}`;
      path.style.strokeDashoffset = "0";
    },
    [],
  );

  // Animate progress using requestAnimationFrame
  const animateProgress = useCallback(
    (from: number, to: number) => {
      if (!pathRef.current || !wrapperRef.current) return;

      const path = pathRef.current;
      const svg = wrapperRef.current.querySelector("svg");
      if (!path || !svg) return;

      const totalLength = path.getTotalLength();
      if (totalLength === 0) return;

      // Cancel any existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationStateRef.current = {
        from,
        to,
        startTime: performance.now(),
        isAnimating: true,
      };

      const duration = 1500; // ms

      const animateStep = (timestamp: number) => {
        const elapsed = timestamp - animationStateRef.current.startTime;
        const progressRatio = Math.min(elapsed / duration, 1);

        // Apply easing
        const easedProgress = easeOutCubic(progressRatio);
        const currentValue = from + (to - from) * easedProgress;

        // Update stroke dash
        applyProgressToPath(currentValue);

        // Show circle only when progress > 0 and < 100
        const shouldShowCircle = currentValue > 0 && currentValue < 100;

        // Update circle position
        if (showProgressCircle && shouldShowCircle) {
          try {
            const point = path.getPointAtLength(
              totalLength * (currentValue / 100),
            );
            if (point) {
              const svgRect = svg.getBoundingClientRect();
              const wrapperRect = wrapperRef.current!.getBoundingClientRect();

              const x = point.x + svgRect.left - wrapperRect.left;
              const y = point.y + svgRect.top - wrapperRect.top;

              // Update circle position directly for smoother animation
              if (circleContainerRef.current) {
                circleContainerRef.current.style.left = `${x}px`;
                circleContainerRef.current.style.top = `${y}px`;
                circleContainerRef.current.style.transform = `translate(-${circleRadius}px, -${circleRadius}px)`;
                circleContainerRef.current.style.opacity = "1";
                circleContainerRef.current.style.display = "flex";
              }
            }
          } catch (error) {
            console.warn("Error updating circle position:", error);
          }
        } else if (circleContainerRef.current) {
          // Hide circle
          circleContainerRef.current.style.opacity = "0";
          circleContainerRef.current.style.display = "none";
        }

        // Continue animation if not finished
        if (progressRatio < 1) {
          animationRef.current = requestAnimationFrame(animateStep);
        } else {
          // Animation complete
          animationRef.current = null;
          animationStateRef.current.isAnimating = false;

          // Ensure final position is accurate
          const shouldShowFinalCircle = to > 0 && to < 100;
          if (shouldShowFinalCircle) {
            const finalPosition = getCirclePosition(to);
            if (finalPosition && circleContainerRef.current) {
              circleContainerRef.current.style.left = `${finalPosition.x}px`;
              circleContainerRef.current.style.top = `${finalPosition.y}px`;
              circleContainerRef.current.style.transform = `translate(-${circleRadius}px, -${circleRadius}px)`;
              circleContainerRef.current.style.opacity = "1";
              circleContainerRef.current.style.display = "flex";
            }
          } else if (circleContainerRef.current) {
            // Hide circle at 0% or 100%
            circleContainerRef.current.style.opacity = "0";
            circleContainerRef.current.style.display = "none";
          }
        }
      };

      // Start animation
      animationRef.current = requestAnimationFrame(animateStep);
    },
    [showProgressCircle, circleRadius, getCirclePosition, applyProgressToPath],
  );

  // CHECK ON MOUNT: Look for stored progress from other pages
  useEffect(() => {
    // Check sessionStorage for previous progress value
    const storedProgress = sessionStorage.getItem(arrowId);
    const storedShouldAnimate = sessionStorage.getItem(`${arrowId}_animate`);

    if (storedProgress && storedShouldAnimate === "true") {
      const previousValue = parseFloat(storedProgress);

      if (previousValue !== progress) {
        // We have a different progress value stored - animate!
        setShouldAnimate(true);
        previousProgressRef.current = previousValue;
      }

      // Clear the animation flag
      sessionStorage.removeItem(`${arrowId}_animate`);
    }
  }, [arrowId, progress]);

  // STORE PROGRESS: When progress changes, store it for other pages
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Store current progress in sessionStorage
    sessionStorage.setItem(arrowId, progress.toString());

    // Also store that we should animate on other pages
    sessionStorage.setItem(`${arrowId}_animate`, "true");

    // Keep track of when this was stored
    sessionStorage.setItem(`${arrowId}_timestamp`, Date.now().toString());

    // Clean up old entries
    const cleanupOldEntries = () => {
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith("arrow_") && key.endsWith("_timestamp")) {
          const arrowKey = key.replace("_timestamp", "");
          const timestamp = sessionStorage.getItem(key);
          if (timestamp && Date.now() - parseInt(timestamp) > 30000) {
            // 30 seconds
            keysToRemove.push(arrowKey);
            keysToRemove.push(`${arrowKey}_animate`);
            keysToRemove.push(key);
          }
        }
      }
      keysToRemove.forEach((key) => sessionStorage.removeItem(key));
    };

    cleanupOldEntries();
  }, [progress, arrowId]);

  useEffect(() => {
    const checkSvgReady = () => {
      if (wrapperRef.current) {
        const path = wrapperRef.current.querySelector("path");
        if (path && path.getTotalLength() > 0) {
          setSvgReady(true);

          if (shouldAnimate) {
            animateProgress(previousProgressRef.current, progress);
          } else {
            applyProgressToPath(progress);

            const shouldShowInitialCircle = progress > 0 && progress < 100;
            if (showProgressCircle && shouldShowInitialCircle) {
              const position = getCirclePosition(progress);
              if (position && circleContainerRef.current) {
                circleContainerRef.current.style.left = `${position.x}px`;
                circleContainerRef.current.style.top = `${position.y}px`;
                circleContainerRef.current.style.transform = `translate(-${circleRadius}px, -${circleRadius}px)`;
                circleContainerRef.current.style.opacity = "1";
                circleContainerRef.current.style.display = "flex";
              }
            } else if (circleContainerRef.current) {
              circleContainerRef.current.style.opacity = "0";
              circleContainerRef.current.style.display = "none";
            }
          }

          return true;
        }
      }
      return false;
    };

    if (!checkSvgReady()) {
      const timer = setTimeout(() => {
        checkSvgReady();
      }, 100);

      const intervalId = setInterval(() => {
        if (checkSvgReady()) {
          clearInterval(intervalId);
        }
      }, 50);

      return () => {
        clearTimeout(timer);
        clearInterval(intervalId);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [
    progress,
    showProgressCircle,
    circleRadius,
    getCirclePosition,
    applyProgressToPath,
    shouldAnimate,
    animateProgress,
  ]);

  useEffect(() => {
    if (!svgReady || shouldAnimate) return;

    if (previousProgressRef.current !== progress) {
      const changeAmount = Math.abs(progress - previousProgressRef.current);

      if (changeAmount > 0.1) {
        animateProgress(previousProgressRef.current, progress);
      } else {
        applyProgressToPath(progress);

        const shouldShowCircle = progress > 0 && progress < 100;
        if (shouldShowCircle) {
          const position = getCirclePosition(progress);
          if (position && circleContainerRef.current) {
            circleContainerRef.current.style.left = `${position.x}px`;
            circleContainerRef.current.style.top = `${position.y}px`;
            circleContainerRef.current.style.transform = `translate(-${circleRadius}px, -${circleRadius}px)`;
          }
        }
      }

      previousProgressRef.current = progress;
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    progress,
    svgReady,
    shouldAnimate,
    animateProgress,
    getCirclePosition,
    applyProgressToPath,
  ]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const XarrowWithRef = useCallback(
    (props: XarrowProps) => {
      const xarrowRef = useCallback(
        (node: HTMLDivElement) => {
          if (node) {
            const path = node.querySelector("path");
            if (path) {
              (pathRef as any).current = path;

              path.style.stroke = props.color || "#6d63ff";
              path.style.strokeWidth = props.strokeWidth
                ? `${props.strokeWidth}px`
                : "4px";
              path.style.strokeDashoffset = "0";

              if (props.dashness) {
                path.style.strokeDasharray = "10 5";
              } else {
                path.style.strokeDasharray = "none";
              }
            }
          }
        },
        [props.color, props.strokeWidth, props.dashness],
      );

      return (
        <div ref={xarrowRef}>
          <Xarrow {...props} />
        </div>
      );
    },
    [xarrowProps.color, xarrowProps.strokeWidth, xarrowProps.dashness],
  );

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <XarrowWithRef {...xarrowProps} />

      {progress < 100 && (
        <div
          id="user-progress-icon"
          ref={circleContainerRef}
          className="pr-2 absolute flex items-center gap-2 bg-black/50 rounded-full transition-none pointer-events-none"
          style={{
            opacity: 0,
            display: "none",
            willChange: "left, top, opacity",
          }}
        >
          <div
            className={`border-white border-2 shrink-0 ${circleClassName}`}
            style={{
              width: circleRadius * 2,
              height: circleRadius * 2,
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              pointerEvents: "none",
            }}
          >
            {user.full_avatar_url ? (
              <Image
                className="w-full h-full rounded-full"
                src={user.full_avatar_url}
                width={30}
                height={30}
                alt="User image"
              />
            ) : user.avatar_symbol ? (
              <div
                style={{ backgroundColor: user.avatar_color }}
                className="rounded-full w-full h-full flex items-center justify-center text-sm"
              >
                {user.avatar_symbol}
              </div>
            ) : (
              <div
                style={{ backgroundColor: user.avatar_color }}
                className="rounded-full w-full h-full flex items-center justify-center text-sm"
              >
                <User width={14} />
              </div>
            )}
          </div>
          {showText && (
            <span className="text-white text-sm">
              {user.username || user.first_name}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(ProgressArrow);
