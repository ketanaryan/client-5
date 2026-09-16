const fs = require("fs");
const path = require("path");

const images = [
  "/images/finance_taxation.jpg",
  "/images/corporate_registration.jpg",
  "/images/audit_advisory.jpg"
];

let i = 0;

function walkSync(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile() && filepath.endsWith(".tsx")) {
      callback(filepath);
    }
  }
}

walkSync("src/app", (filepath) => {
  let content = fs.readFileSync(filepath, "utf8");
  
  // Replace the broken unsplash URLs
  // The URL in the file is EXACTLY: "https://images.unsplash.com/photo-=800&q=80"
  // Let's replace each occurrence with one of the local images in round-robin fashion.
  
  const regex = /"https:\/\/images\.unsplash\.com\/photo-=800&q=80"/g;
  if (content.match(regex)) {
    content = content.replace(regex, () => {
      const img = images[i % images.length];
      i++;
      return `"${img}"`;
    });
    fs.writeFileSync(filepath, content, "utf8");
    console.log("Updated images in:", filepath);
  }
});
