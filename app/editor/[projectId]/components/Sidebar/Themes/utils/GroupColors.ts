import chroma from "chroma-js";
import DBSCAN from "density-clustering";

// Sample list of hex colors extracted from page
// const colors = [
//   "#ffffff",
//   "#f8f9fa",
//   "#f1f3f5",
//   "#e9ecef", // base shades
//   "#007bff",
//   "#0d6efd",
//   "#0056d2", // primary blue shades
//   "#e83e8c",
//   "#dc3545",
//   "#c82333", // accent reds/pinks
// ];
const colors = [
  "#76d297",
  "#ffffff",
  "#020202",
  "#ffc100", // base shades
  "#f1f2f4",
  "#f9f8cf",
  "#ff5862", // primary blue shades
  "#437ae8",
];

export function GroupColors(colors: string[]) {
  // Step 1: Convert to Lab color space (for perceptual similarity)
  const labColors = colors.map((hex) => chroma(hex).lab());

  // Step 2: Run DBSCAN clustering
  const dbscan = new DBSCAN.DBSCAN();
  const epsilon = 15; // max distance between colors in same cluster
  const minPts = 1; // minimum number of similar colors to form a cluster
  const clusters = dbscan.run(labColors, epsilon, minPts);

  // Step 3: Map back to hex
  return clusters.map((clusterIndices) => {
    return clusterIndices.map((index) => colors[index]);
  });
}

console.log("🎨 Grouped Color Palettes:", GroupColors(colors));
