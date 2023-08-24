import * as faceapi from "face-api.js"
import './App.css';
import { useEffect,useRef } from "react";
import testImage from "./test2.jpg"


function App() {
  const myImage = useRef(null);
  const myCanvas = useRef(null);

  const detect = async ()=>{
    const detections = await faceapi.detectAllFaces(myImage.current,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    // console.log(detections);
    const displaySize = { width: myImage.current.width, height: myImage.current.height }
    faceapi.matchDimensions(myCanvas.current, displaySize)
    /* Display detected face bounding boxes */
//const detections = await faceapi.detectAllFaces(myImage.current)
// resize the detected boxes in case your displayed image has a different size than the original
const resizedDetections = faceapi.resizeResults(detections, displaySize)
// draw detections into the canvas
faceapi.draw.drawDetections(myCanvas.current, resizedDetections)

/* Display face landmarks */
const detectionsWithLandmarks = await faceapi
  .detectAllFaces(myImage.current,new faceapi.TinyFaceDetectorOptions())
  .withFaceLandmarks()
// resize the detected boxes and landmarks in case your displayed image has a different size than the original
const resizedResults = faceapi.resizeResults(detectionsWithLandmarks, displaySize)
// draw detections into the canvas
faceapi.draw.drawDetections(myCanvas.current, resizedResults)
// draw the landmarks into the canvas
faceapi.draw.drawFaceLandmarks(myCanvas.current, resizedResults)
  }
  useEffect(()=>{
    Promise.all([
      // faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      // faceapi.nets.ageGenderNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      // faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      // faceapi.nets.tinyYolov2.loadFromUri('/models')
  ]).then(()=>{
    if(myImage.current){
      detect()
    }
  })
    .catch((err)=>{
      console.log(err);
    })
    
  },[])
  return (
    <div className="App" style={{display:"flex"}}>
      <img src={testImage} alt="" style={{width:"500px",height:"400px"}} ref={myImage} />
      <canvas ref={myCanvas} style={{position:"absolute",width:"500px",height:"400px"}}></canvas>
    </div>
  );
}

export default App;
