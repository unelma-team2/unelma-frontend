"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import ArrowButtons from "./ArrowButtons";

export default function Carousel({ items = [], renderItem }) {
  const theme = useTheme();

  // Responsive
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const visibleCount = isXs ? 1 : isSm ? 2 : 3;

  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  // Swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  const spring = { type: "spring", stiffness: 300, damping: 30 };

  const carouselWidth = 100 * items.length / visibleCount; // percentage
  const xOffset = -(index * 100) / visibleCount;

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }} {...swipeHandlers}>
      <motion.div
        drag="x"
        dragConstraints={{ left: -((items.length - visibleCount) * 300), right: 0 }}
        dragElastic={0.3}
        style={{ display: "flex" }}
        animate={{ x: `${xOffset}%` }}
        transition={spring}
      >
        {items.map((item, i) => (
          <Box
            key={item.id || i}
            sx={{
              flex: `0 0 ${100 / visibleCount}%`,
              px: 1,
            }}
          >
            {renderItem(item)}
          </Box>
        ))}
      </motion.div>

      <ArrowButtons onPrev={prev} onNext={next} />
    </Box>
  );
}
