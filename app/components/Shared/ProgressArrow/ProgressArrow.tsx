import React, { useRef, useLayoutEffect } from "react";
import Xarrow from "react-xarrows";

type XarrowProps = React.ComponentProps<typeof Xarrow>;

interface ProgressArrowProps extends XarrowProps {
  progress: number;
}

const ProgressArrow: React.FC<ProgressArrowProps> = ({
  progress,
  ...xarrowProps
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const applyProgressToPath = () => {
    if (wrapperRef.current) {
      const path = wrapperRef.current.querySelector("path");

      if (path) {
        const validatedProgress = Math.max(0, Math.min(100, progress));
        const length = path.getTotalLength();

        path.style.strokeDasharray = `${length} ${length}`;
        const offset = length * (1 - validatedProgress / 100);
        path.style.strokeDashoffset = offset.toString();
        path.style.transition = "stroke-dashoffset 0.5s ease-out";
      }
    }
  };

  useLayoutEffect(() => {
    applyProgressToPath();

    const observer = new MutationObserver(() => {
      applyProgressToPath();
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    window.addEventListener("resize", applyProgressToPath);
    window.addEventListener("scroll", applyProgressToPath);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", applyProgressToPath);
      window.removeEventListener("scroll", applyProgressToPath);
    };
  }, [progress, xarrowProps.start, xarrowProps.end]);

  return (
    <div ref={wrapperRef}>
      <Xarrow {...xarrowProps} />
    </div>
  );
};

export default ProgressArrow;
