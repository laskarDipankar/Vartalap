import { Box, Divider, Modal } from "@mui/material";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { notification } from "../../../recoil/Atom";

interface Props {
  state: boolean;
  handleModal: (state: boolean) => void;
}

const NotificationModal = ({ state, handleModal }: Props) => {
  const notificationState = useRecoilValue(notification);

  const [notificationData, setNotificationData] = useRecoilState(notification);
  return (
    <>
      <Modal
        open={state}
        onClose={() => {
          handleModal(false);
        }}
        component="span"
        sx={{
          border: "none",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba( 177, 47, 168, 0.75 )",
            width: "400px",
            height: "400px",
            top: "50px",
            right: "180px",
            position: "absolute",
            display: "flex",
          }}
        >
          <Box
            onMouseLeave={() => handleModal(false)}
            sx={{
              width: "50%",
              padding: "10px",
            }}
          >
            {notificationState.map((item: any, idx: Number) => {
              if (idx >= 0 && item.message !== "") {
                return (
                  <Box
                    sx={{
                      border: "2px solid white",
                      backgroundColor: "white",
                      width: "23rem",
                      height: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setNotificationData((prev: any) =>
                          prev.map((item: any, index: Number) => {
                            if (idx === index) {
                              return {
                                ...item,
                                message: "",
                                read: true,
                              };
                            }
                          })
                        );
                      }}
                    >
                      <span>{item.senderName}</span>
                      <span>{item.message}</span>
                    </div>
                    <Divider orientation="horizontal" flexItem />
                  </Box>
                );
              }
            })}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NotificationModal;
