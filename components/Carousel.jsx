"use client"

import { Box, useTheme, useMediaQuery } from "@mui/material"
import { motion } from "framer-motion"
import { useState } from "react"
import { useSwipeable } from "react-swipeable"
import ArrowButtons from "./ArrowButtons"

export default function Carousel({ items = [], renderItem }) {
  const theme = useTheme()

  const isXs = useMediaQuery(theme.breakpoints.down("sm"))
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const visibleCount = isXs ? 1 : isSm ? 2 : 3

  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % items.length)
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length)

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  })

  const spring = { type: "spring", stiffness: 300, damping: 30 }

  const carouselWidth = (100 * items.length) / visibleCount
  const xOffset = -(index * 100) / visibleCount

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "visible",
        px: { xs: 8, md: 10 },
        py: 2,
      }}
      {...swipeHandlers}
    >
      <Box sx={{ overflow: "hidden" }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -((items.length - visibleCount) * 300), right: 0 }}
          dragElastic={0.3}
          style={{ display: "flex", gap: "24px" }}
          animate={{ x: `${xOffset}%` }}
          transition={spring}
        >
          {items.map((item, i) => (
            <Box
              key={item.id || i}
              sx={{
                flex: `0 0 ${100 / visibleCount}%`,
                maxWidth: `calc(${100 / visibleCount}% - 24px)`,
              }}
            >
              {renderItem(item)}
            </Box>
          ))}
        </motion.div>
      </Box>

      <ArrowButtons onPrev={prev} onNext={next} />
    </Box>
  )
}
