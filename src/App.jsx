import * as faceapi from "face-api.js"
import './App.css';
import { useEffect,useRef,useState } from "react";
// import testImage from "./test2.jpg"


function App() {
  const myImage = useRef(null);
  const myCanvas = useRef(null);
  const [ready , setReady] = useState(false);

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
faceapi.draw.drawFaceLandmarks(myCanvas.current, resizedResults);

/* Display face expression results */
const detectionsWithExpressions = await faceapi
  .detectAllFaces(myImage.current,new faceapi.TinyFaceDetectorOptions())
  .withFaceLandmarks()
  .withFaceExpressions()
// resize the detected boxes and landmarks in case your displayed image has a different size than the original
const resizedResults2 = faceapi.resizeResults(detectionsWithExpressions, displaySize)
// draw detections into the canvas
faceapi.draw.drawDetections(myCanvas.current, resizedResults2)
// draw a textbox displaying the face expressions with minimum probability into the canvas
const minProbability = 0.05
faceapi.draw.drawFaceExpressions(myCanvas.current, resizedResults2, minProbability)
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
    setReady(true);
  })
    .catch((err)=>{
      console.log(err);
    })
    
  },[])

    const [selectedImage, setSelectedImage] = useState(null);
    const [testImage, setImageUrl] = useState(null);
  
    const handleImageChange = (event) => {
      const file = event.target.files[0]; // Get the selected file
      setSelectedImage(file); // Store the selected file in state
      setImageUrl(URL.createObjectURL(file)); // Create a temporary URL for the image
    };
  
    const handleUpload = () => {
      // Upload logic...
    };

  return (
    <div className="App" >
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div style={{display:"flex",justifyContent:"center"}} >
        {testImage && <img src={testImage} alt="Uploaded" style={{width:"500px",height:"400px",border:"solid 5px #060068",borderRadius: "20px"}} ref={myImage} />}
        {testImage && <canvas ref={myCanvas} style={{position:"absolute",width:"500px",height:"400px"}}></canvas>}
      </div>
      {testImage && ready && <button class="button-28" onClick={detect}>Detect</button>}

    </div>
  );
}

export default App;
