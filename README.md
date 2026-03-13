# 📷 Web Camera Recorder

A lightweight browser-based camera application built with **HTML, CSS, and Vanilla JavaScript**. This project demonstrates how modern browser APIs can be used to build an interactive media application that allows users to record videos, capture screenshots, and apply real-time filters directly in the browser.

The application uses the **MediaDevices API** to access the user's webcam, the **MediaRecorder API** for recording video streams, and the **Canvas API** to capture frames from the video. The goal of this project is to explore practical use of browser multimedia APIs while building a simple and intuitive camera interface.

---

## 🚀 Features

* Record video directly from the webcam
* Pause and resume recording
* Live recording timer
* Capture screenshots from the video feed
* Apply color filters to the camera preview
* Download recorded videos automatically
* Save captured images instantly

---

## 🛠 Tech Stack

* **HTML5**
* **CSS3**
* **JavaScript (ES6)**
* **MediaDevices.getUserMedia API**
* **MediaRecorder API**
* **Canvas API**

---

## ⚙️ How It Works

1. The application requests permission to access the webcam using `getUserMedia()`.
2. The video stream is rendered inside a `<video>` element.
3. The **MediaRecorder API** records the live video stream.
4. Screenshots are captured by drawing the video frame onto a **Canvas**.
5. Filters are applied using an overlay layer above the video element.

---

## 📂 Project Structure

```
camera-recorder
│
├── index.html
├── style.css
├── index.js
└── README.md
```

---

## 💡 Learning Goals

This project helped reinforce concepts such as:

* Working with browser multimedia APIs
* Handling real-time media streams
* Canvas-based image processing
* DOM event handling and UI interaction

---

## 👨‍💻 Author

**Anand Swaroop**

---

## 📄 License

This project is open-source and available for learning and experimentation.
