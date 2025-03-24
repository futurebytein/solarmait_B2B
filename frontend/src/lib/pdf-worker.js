if (process.env.NODE_ENV === "production") {
  // use minified verion for production
  module.exports = import("pdfjs-dist/build/pdf.worker.min.js");
} else {
  module.exports = import("pdfjs-dist/build/pdf.worker.js");
}
