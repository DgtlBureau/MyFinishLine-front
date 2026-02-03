"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Xarrow from "react-xarrows";

import { logger } from "@/app/lib/logger";
type XarrowProps = React.ComponentProps<typeof Xarrow>;

interface ProgressArrowProps extends XarrowProps {
  progress: number;
  showProgressCircle?: boolean;
  circleColor?: string;
  circleRadius?: number;
  circleClassName?: string;
  showText?: boolean;
}

const STORAGE_KEY_PREFIX = "progress_arrow_";

const ProgressArrow: React.FC<ProgressArrowProps> = ({
  progress,
  showProgressCircle = true,
  circleRadius = 16,
  circleClassName = "",
  showText = true,
  ...xarrowProps
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const circleContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [svgReady, setSvgReady] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const arrowId = `${STORAGE_KEY_PREFIX}${xarrowProps.start}_${xarrowProps.end}`;

  // Easing function
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

  // Calculate animation duration based on progress change
  const getAnimationDuration = (fromProgress: number, toProgress: number): number => {
    const change = Math.abs(toProgress - fromProgress);

    if (change === 0) return 0;

    // Slower animation speeds for better visibility
    // Small changes (< 5%): 300ms per 1%
    // Medium changes (5-20%): 200ms per 1%
    // Large changes (> 20%): 100ms per 1%
    // Minimum 1000ms, maximum 5000ms

    let msPerPercent: number;
    if (change < 5) {
      msPerPercent = 300;
    } else if (change < 20) {
      msPerPercent = 200;
    } else {
      msPerPercent = 100;
    }

    const duration = change * msPerPercent;
    return Math.max(1000, Math.min(duration, 5000));
  };

  // Update circle position
  const updateCirclePosition = (progressValue: number) => {
    if (!pathRef.current || !wrapperRef.current || !circleContainerRef.current) return;

    const path = pathRef.current;
    const svg = wrapperRef.current.querySelector("svg");
    if (!svg) return;

    const totalLength = path.getTotalLength();
    if (totalLength === 0) return;

    const shouldShow = progressValue > 0 && progressValue < 100;

    if (!shouldShow) {
      circleContainerRef.current.style.opacity = "0";
      circleContainerRef.current.style.display = "none";
      return;
    }

    try {
      const point = path.getPointAtLength(totalLength * (progressValue / 100));
      const svgRect = svg.getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();

      const x = point.x + svgRect.left - wrapperRect.left;
      const y = point.y + svgRect.top - wrapperRect.top;

      circleContainerRef.current.style.left = `${x}px`;
      circleContainerRef.current.style.top = `${y}px`;
      circleContainerRef.current.style.transform = `translate(-${circleRadius}px, -${circleRadius}px)`;
      circleContainerRef.current.style.opacity = "1";
      circleContainerRef.current.style.display = "flex";
    } catch (error) {
      logger.warn("Error updating circle position:", error);
    }
  };

  // Update stroke dash
  const updateStrokeDash = (progressValue: number) => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    if (totalLength === 0) return;

    const strokeLength = totalLength * (progressValue / 100);
    path.style.strokeDasharray = `${strokeLength} ${totalLength}`;
    path.style.strokeDashoffset = "0";
  };

  // Animate from one progress value to another
  const animateProgress = (from: number, to: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const duration = getAnimationDuration(from, to);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const easedRatio = easeOutCubic(ratio);
      const currentProgress = from + (to - from) * easedRatio;

      updateStrokeDash(currentProgress);
      if (showProgressCircle) {
        updateCirclePosition(currentProgress);
      }

      if (ratio < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
        // Store final progress
        sessionStorage.setItem(arrowId, to.toString());
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Initialize and handle progress changes
  useEffect(() => {
    if (!svgReady) return;

    const storedProgress = sessionStorage.getItem(arrowId);
    const previousProgress = storedProgress ? parseFloat(storedProgress) : 0;

    if (previousProgress !== progress) {
      // Set initial position immediately (where animation starts from)
      updateStrokeDash(previousProgress);
      if (showProgressCircle && previousProgress > 0) {
        updateCirclePosition(previousProgress);
      }

      // Delay animation start to let the page fully render
      const delayTimer = setTimeout(() => {
        animateProgress(previousProgress, progress);
      }, 800);

      return () => {
        clearTimeout(delayTimer);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      // No animation needed, just set position
      updateStrokeDash(progress);
      if (showProgressCircle) {
        updateCirclePosition(progress);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [svgReady, progress, arrowId, showProgressCircle]);

  // Wait for SVG to be ready
  useEffect(() => {
    const checkSvgReady = () => {
      if (!wrapperRef.current) return false;

      const path = wrapperRef.current.querySelector("path");
      if (path && path.getTotalLength() > 0) {
        pathRef.current = path;

        // Apply initial styles
        path.style.stroke = xarrowProps.color?.toString() || "#6d63ff";
        path.style.strokeWidth = xarrowProps.strokeWidth ? `${xarrowProps.strokeWidth}px` : "4px";
        path.style.strokeDashoffset = "0";

        setSvgReady(true);
        return true;
      }
      return false;
    };

    if (!checkSvgReady()) {
      const intervalId = setInterval(() => {
        if (checkSvgReady()) {
          clearInterval(intervalId);
        }
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [xarrowProps.color, xarrowProps.strokeWidth]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <Xarrow {...xarrowProps} />

      {showProgressCircle && progress < 100 && (
        <div
          id="user-progress-icon"
          ref={circleContainerRef}
          className="pr-2 absolute flex items-center gap-2 bg-black/50 rounded-full pointer-events-none"
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

export default ProgressArrow;
