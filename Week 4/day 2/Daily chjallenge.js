// CHALLENGE
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }
  watch() {
    console.log(`${this.uploader} watched all ${this.time}s of ${this.title}!`);
  }
}
const video1 = new Video("JS Fundamentals", "Alice", 300);
video1.watch(); 
const video2 = new Video("Advanced CSS", "Bob", 600);
video2.watch(); 
const videoData = [
  { title: "React Intro", uploader: "Charlie", time: 450 },
  { title: "Node.js Crash Course", uploader: "Diana", time: 1200 },
  { title: "Async JS Tutorial", uploader: "Eve", time: 800 },
  { title: "TypeScript Essentials", uploader: "Frank", time: 950 },
  { title: "Docker Basics", uploader: "Grace", time: 1100 }
];
const videoInstances = videoData.map(data => {
  const instance = new Video(data.title, data.uploader, data.time);
  instance.watch();
  return instance;
});
