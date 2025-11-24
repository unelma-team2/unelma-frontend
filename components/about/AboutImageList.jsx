import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function AboutImageList() {
  return (
    <ImageList
      sx={{ width: 500, height: 1000 }}
      variant="quilted"
      cols={2}
      rowHeight={160}
    >
      {itemData.map((item, i) => (
        <FlippingTile key={i} {...item} />
      ))}
    </ImageList>
  );
}

function FlippingTile({ src, backSrc, cols = 1, rows = 1 }) {
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const randomInterval = () => 6000 + Math.random() * 3500;

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        if (!paused) setFlipped(f => !f);
      }, randomInterval());
    };

    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  return (
    <ImageListItem cols={cols} rows={rows}>
      <div
        style={{
          perspective: "1200px",
          width: "100%",
          height: "100%",
        }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            cursor: "pointer",
          }}
        >
          {/* FRONT */}
          <motion.img
            src={src}
            alt=""
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
              backfaceVisibility: "hidden",
            }}
          />

          {/* BACK */}
          <motion.img
            src={backSrc}
            alt=""
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>
      </div>
    </ImageListItem>
  );
}

const itemData = [
  // --- ROW 1 ---
  { src: "/images/about/imagelist/pexels-hiteshchoudhary-1261427.jpg",    backSrc: "/images/about/imagelist/pexels-peaky-31343630.jpg",    rows: 1, cols: 1 },
  { src: "/images/about/imagelist/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg",  backSrc: "/images/about/imagelist/pexels-marceloverfe-12954767.jpg",  rows: 1, cols: 1 },

  // --- ROW 2 ---
  { src: "/images/about/imagelist/pexels-cottonbro-6804069.jpg",   backSrc: "/images/about/imagelist/pexels-cookiecutter-17489153.jpg",   rows: 1, cols: 1 },
  { src: "/images/about/imagelist/pexels-rucasouza-1049764.jpg",  backSrc: "/images/about/imagelist/pexels-thisisengineering-3861969.jpg",  rows: 1, cols: 1 },

  // --- ROW 3 ---
  { src: "/images/about/imagelist/pexels-fauxels-3183150.jpg",  backSrc: "/images/about/imagelist/pexels-fauxels-3183151.jpg",  rows: 2, cols: 2 },

  // --- ROW 4 ---
  { src: "/images/about/imagelist/pexels-olly-3791130.jpg",   backSrc: "/images/about/imagelist/pexels-olly-3791136.jpg" ,   rows: 1, cols: 1 },
  { src: "/images/about/imagelist/pexels-psco-204686.jpg",   backSrc: "/images/about/imagelist/pexels-hillaryfox-1595391.jpg" ,   rows: 1, cols: 1 },

  // --- ROW 5 ---
  { src: "/images/about/imagelist/pexels-markusspiske-330771.jpg",   backSrc: "/images/about/imagelist/priscilla-du-preez-XkKCui44iM0-unsplash.jpg",   rows: 1, cols: 1 },
  { src: "/images/about/imagelist/pexels-joshsorenson-990423.jpg", backSrc: "/images/about/imagelist/pexels-edmond-dantes-8068878.jpg", rows: 1, cols: 1 },
];
