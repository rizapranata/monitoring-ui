module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
  ],
};

/**
 * browser vendor prefix merupakan awalan untuk properti CSS tertentu berdasarkan browser, misalnya
 * --moz-transition --webkit-transition, nah dengan autoprefixer kita tidak perlu menuliskannya secara manual,
 * cukup tuliskan transition maka autoprefixer akan otomatis menuliskan vendor prefix untuk kita.
 */
