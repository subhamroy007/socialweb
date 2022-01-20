import { useMemo } from "react";
import { Size } from "../utility/types";

const useVideoResizer = (
  width: Size,
  height: Size
): { width: number; height: number } => {
  const resolution = useMemo<{ width: number; height: number }>(
    () => ({
      width: width.max,
      height: Math.min(
        height.max,
        Math.max(
          height.min,
          (width.max * (height.original as number)) / (width.original as number)
        )
      ),
    }),
    [width.max, height.max, height.min, height.original]
  );

  return resolution;
};

export default useVideoResizer;
