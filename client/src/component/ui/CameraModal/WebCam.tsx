import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef } from "react";
import Webcam from "react-webcam";

interface Props {
  state: any;
  handleOpen: any;
}

const WebCamera = ({ state, handleOpen }: Props) => {
  const webref = useRef<any>(null);
  const showImage = () => {
    const imageSrc = webref.current.getScreenshot();
    console.log(imageSrc);
    // console.log(webref.current);
    handleOpen(false);
  };
  return (
    <>
      <Modal open={state}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Webcam ref={webref} />
          <button onClick={showImage}>CLick</button>
          <button
            onClick={() => {
              handleOpen(false);
            }}
          >
            close
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default WebCamera;
