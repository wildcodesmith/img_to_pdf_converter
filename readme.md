# 🚀 High-Performance Multi-Image to PDF Converter

A lightweight, full-stack web application that allows users to seamlessly batch-convert multiple images (`JPG`, `JPEG`, `PNG`) into a single, compiled PDF document. Built using a modern **Node.js, MVC architecture** and fully responsive frontend technologies.

---

## ✨ Key Features

- **📂 Fluid UI/UX & Drag-and-Drop:** Built a seamless, interactive dashed dropzone with real-time image thumbnail previews.
- **🌗 System-Aware Dark Mode:** Automatically detects system theme preference (`prefers-color-scheme`) via Tailwind CSS, featuring custom theme-blending behavior during drag operations.
- **⚡ High-Performance Streaming:** Utilizes Node.js writable response streams (`pdfkit` piped directly to `res`) to send payloads chunk-by-chunk instead of keeping entire blocks in server memory.
- **🛡️ Fault-Tolerant Processing:** Built-in catch blocks isolate corrupted images, outputting a clear warning page inside the document without crashing the Express runtime pipeline (`ERR_STREAM_WRITE_AFTER_END` prevention).
- **🗃️ Automatic Server-Side Cleanup:** Instantly purges cached/uploaded local disk artifacts asynchronously using `fs.unlink` upon stream conclusion.
- **🎯 Dynamic Collisionless Naming:** Generates chronological dynamic Unix epoch timestamps for downloads to prevent client-directory name overlaps.

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5 / EJS (Embedded JavaScript Templates)
- Tailwind CSS (For dynamic design tokens & responsive components)
- Vanilla JavaScript (Fetch API, FormData, Object URLs, Async/Await)

**Backend:**
- Node.js (ES Modules)
- Express.js  
- Multer (Multipart form-data & file interceptor management module)
- PDFKit (Dynamic PDF construction module)

---

## 📂 Project Architecture (MVC Pattern)

The codebase has been meticulously modularized adhering to clean Model-View-Controller architecture boundaries:

```text
├── controllers/
│   └── pdfController.js      
├── routes/
│   └── pdfRoutes.js          
├── public/
│   ├── css/
│   |── js/
│   └── images/          
├── views/
│   └── form.ejs             
├── uploads/                 # Temporary server-side img folder (auto-cleansed)
├── index.js                 # Primary server entrypoint and app configurations
├── package.json
├── package-lock.json
└── README.md