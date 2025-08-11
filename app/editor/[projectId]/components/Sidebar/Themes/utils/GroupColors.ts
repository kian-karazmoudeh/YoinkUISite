import chroma from "chroma-js";
import DBSCAN from "density-clustering";

// const colors = [
//   "#000000",
//   "#555555",
//   "#ff6600",
//   "#323232",
//   "#e4544b",
//   "#48b584",
//   "#1269cf",
//   "#268bd2",
// ];

export function GroupColors(colors: string[], epsilon: number = 20) {
  // Step 1: Convert to Lab color space (for perceptual similarity)
  console.log("🎨 Grouping Colors:", colors);
  const labColors = colors.map((hex) => chroma(hex).lab());

  // Step 2: Run DBSCAN clustering
  const dbscan = new DBSCAN.DBSCAN();
  // const epsilon = 30; // max distance between colors in same cluster
  const minPts = 1; // minimum number of similar colors to form a cluster
  const clusters = dbscan.run(labColors, epsilon, minPts);

  // Step 3: Map back to hex
  return clusters.map((clusterIndices) => {
    return clusterIndices.map((index) => colors[index]);
  });
}

// console.log(chroma("oklch(1 0 0)").hex());

// console.log("🎨 Grouped Color Palettes:", GroupColors(colors));
