import * as faceapi from "face-api.js"
import './App.css';
import { useEffect } from "react";
import testImage from "./test.jpg"


function App() {
  useEffect(()=>{
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromDisk('./models'),
      faceapi.nets.ageGenderNet.loadFromDisk('./models'),
      faceapi.nets.faceExpressionNet.loadFromDisk('./models'),
      faceapi.nets.faceLandmark68Net.loadFromDisk('./models'),
      faceapi.nets.faceLandmark68TinyNet.loadFromDisk('./models'),
      faceapi.nets.faceRecognitionNet.loadFromDisk('./models'),
      faceapi.nets.tinyFaceDetector.loadFromDisk('./models'),
      faceapi.nets.tinyYolov2.loadFromDisk('./models')
  ]).then(()=>{

  })
    .catch((err)=>{
      console.log(err);
    })
    
  },[])
  return (
    <div className="App">
      <img src={testImage} alt="" style={{width:"500px"}}/>
    </div>
  );
}

export default App;
