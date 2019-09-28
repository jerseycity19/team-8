import React from 'react'
import Webcam from "react-webcam";
const Clarifai = require('clarifai');

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const app = new Clarifai.App({
    apiKey: process.env.REACT_APP_CLARIFAI_KEY
});

let age = 0

const Verify = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc.substring(23));
            app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", { base64: imageSrc.substring(23) }).then(
                function (response) {
                    // do something with response
                    age = 0;
                    const age_spread = response.outputs[0].data.regions[0].data.face.age_appearance.concepts;
                    for (var i = 0; i < age_spread.length; i++) {
                        age += parseInt(age_spread[i].name, 10);
                    }
                    age = age / age_spread.length;
                    console.log(age);
                    alert("Your approximate age is " + age + ((age >= 16 && age <= 25) ? ". You are allowed to sign up.":". You are not allowed to sign up."));
                },
                function (err) {
                    // there was an error
                    console.log("something went wrong");
                }
            );
        },
        [webcamRef]
    );

    return (
        <>
            <Webcam
                audio={false}
                height={360}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={640}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Check your age!</button>

        </>
    );
};

export default Verify;