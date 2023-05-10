// import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";
import React from "react";
// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { ClipLoader } from "react-spinners";
function App() {
  const [audiolink, setaudiolink] = useState(null);
  const url = useRef();
  const [showA, setShowA] = useState(false);
  const [error, seterror] = useState("");
  const [youtubevideo, setyoutubevideo] = useState();
  const [isDownloaded, setisDownloaded] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const extractID =()=> {
    if (url.current.value === "") {
      alert("Paste url here");
    } else {
      
      const match = url.current.value.match(
        /(?:\/|%3D|v=)([a-zA-Z0-9_-]{11}).*/
      );
      
      return match && match[1];
      // setid(match && match[1]);
      // downloadaudio();
    }
  };
  const downloadaudio =async()=> {
    const id = extractID();
    
//  console.log(id)
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${id} `;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key":process.env.REACT_APP_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };

    try {
      
      setisDownloaded(true);
      seterror("");
      const response = await fetch(url, options);

      const result = await response.text();
      // console.log(result);
      console.log(JSON.parse(result));
      const t = await JSON.parse(result);
      // fetch(t.link)
      //         .then((res) => res.blob())
      //         .then((res) => {
      //           console.log(res);
      //           const url1 = window.URL.createObjectURL(res);
      //           const link = document.createElement("a");
      //           link.href = url1;
      //           link.download = "filename";
      //           document.body.appendChild(link);
      //           link.click();
      //           link.remove();
      //         })
      //         .catch((err) => console.log(err));

     
      setaudiolink(t);
      if (t.status === "ok") {
        setisDownloaded(false);
        toggleShowA();
        
        
      } else {
        setisDownloaded(false);
        seterror("😔 Oops, mp3 format is not available!!!");
        
      }
      Youtube(id);
    } catch (error) {
      // console.error(error);
    }
  }

  const Youtube = async (id) => {
    // console.log(id)
    const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "20d84a648bmsh3dc35653535ec2dp121373jsn24e2c593b54c",
        "X-RapidAPI-Host": "ytstream-download-youtube-videos.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(JSON.parse(result));
      setyoutubevideo(JSON.parse(result));
      // seturllink(JSON.parse(result).adaptiveFormats);
      // console.log(JSON.parse(result).formats);
      // seta(JSON.parse(result).formats);
      //   fetch()
      //         .then((res) => res.blob())
      //         .then((res) => {
      //           console.log(res);
      //           const url1 = window.URL.createObjectURL(res);
      //           const link = document.createElement("a");
      //           link.href = url1;
      //           link.download = "filename";
      //           document.body.appendChild(link);
      //           link.click();
      //           link.remove();
      //         })
      //         .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2 className="alert-info  text-center">Youtube Video to MP3 and Youtube video Downloader</h2>
      <div style={{ marginTop: "13vh" }}>
        <div style={{ display: "grid", placeItems: "center" }}>
          <input
            ref={url}
            style={{ width: "95%" }}
            className="form-control form-control-lg "
            type="text"
            placeholder="Paste URL here"
            aria-label=".form-control-lg example"
            required
          />
        </div>
        
        <button
          onClick={downloadaudio}
          style={{ marginTop: "20px", marginLeft: "42%" }}
          className="btn btn-danger"
        >
          Download
        </button>
      </div>

      <br />
      <br />
      <div style={{ display: "grid", placeItems: "center", width: "100%" }}>
       
      {/* it will show a toast message for mp3 song */}
        <Row>
          <Col
            style={{ display: "grid", placeItems: "center" }}
            md={6}
            className="mb-2"
          >
            <Toast show={showA} onClose={toggleShowA}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Audio Format</strong>
                <small>{audiolink?.duration?.toFixed(0)} seconds</small>
              </Toast.Header>
              <Toast.Body>
                Title : {audiolink?.title}
                &nbsp;&nbsp;
                <a
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                  href={audiolink?.link}
                  download
                 
                >
                  Click here to Download
                </a>
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </div>

      {/* showing a spinner */}
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        <br />
        <ClipLoader
          loading={isDownloaded}
          size="100px"
          color="white"
          speedMultiplier="1"
        />
      </div>
      {/* showing an error */}
      <div
        style={{
          color: "white",
          display: "grid",
          placeItems: "center",
          fontWeight: "600",
          fontSize: "25px",
        }}
      >
        { error?.length>0?error:""}
      </div>

      <br />
      <br />
      <br />
      {/* Youtube video  */}
      
     {youtubevideo?.status==="OK"?(<><div style={{width:"100%",display:"grid",placeItems:"center",}}> <p style={{color:"white",fontSize:"35px",position:"absolute",border:"2px dotted white",padding:"0px 10px"}}>Video Format</p> </div>
     <div className="album py-5 ">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {youtubevideo?.formats?.map((e, index) => {
              return (
                < >
                  {e?.mimeType?.slice(0, 9) === "video/mp4" ? (
                    <div  className="col">
                      <div className="card shadow-sm">
                        <img
                          src={
                            youtubevideo?.thumbnail[youtubevideo?.thumbnail?.length - 1]
                              ?.url
                          }
                          alt=""
                        />

                        <div className="card-body">
                          <p className="card-text">{youtubevideo?.title}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <a
                                href={e?.url}
                                target="_blank"
                                download
                                rel="noreferrer"
                              >
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-success "
                                >
                                  Download
                                </button>
                              </a>
                            </div>
                            <small className="text-muted">{e?.qualityLabel}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
     </>):"" }
   
 

    </>
  );
}

export default App;
