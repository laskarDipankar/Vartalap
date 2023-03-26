import { useEffect, useState } from "react";
import {
  ChatBody,
  ChatContainer,
  ChatFooter,
  ChatHeader,
  ChatStyled,
  Reciever,
  RecieverMSg,
  Sender,
  SenderMSg,
} from "./Styled";
// import
import { Attachment, Call, Camera, Mic, Send } from "@mui/icons-material";
// import { Conversation } from "../../../data/Conversation";
import Person2Icon from "@mui/icons-material/Person2";
import { Box, IconButton, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import ChatList, {
  getTokenFromLocalStorage,
} from "../../../component/ui/chatList/ChatList";
import { api } from "../../../lib/Axios";
import { chatState, rerender, notification } from "../../../recoil/Atom";
import Webcam from "react-webcam";
import { useRef } from "react";
import WebCamera from "../../../component/ui/CameraModal/WebCam";
import TextsmsIcon from "@mui/icons-material/Textsms";
import Lottie from "lottie-react";
import loading from "../../../assets/loading.json";

let socket: any, selectedChatCompare: any;

const endPoint = "http://127.0.0.1:5550";

const Index = () => {
  const currentChat = useRecoilValue(chatState);
  const userData = getTokenFromLocalStorage("userData");
  const [chatData, setChatData] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [cameraon, setCameraOn] = useState(false);
  const [state, setState] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [socketconnected, setSocketConnected] = useState(false);
  const [mode, setmode] = useState("offline");
  const reRender = useRecoilValue(rerender);
  const [, setReRender] = useRecoilState(rerender);
  const [notificationState, setNotificationState] =
    useRecoilState(notification);

  function onConnect() {
    fetchChatData();
    socket.setSocketConnected(true);
  }

  function onDisconnect() {
    setSocketConnected(false);
  }

  useEffect(() => {
    socket = io(endPoint);
    setSocketConnected(true);
    socket.emit("setup", userData?.UserExist._id);
    socket.on("connection", onConnect);
    socket.on("typing", (data: any) => {
      setIsTyping(true);
      console.log("typing1");
    });

    socket.on("stop typing", (data: any) => {
      setIsTyping(false);
    });

    return () => {
      socket.off("connection", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  const fetchChatData = async () => {
    try {
      const res = await api.get(`/get/${currentChat.chatId}`, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      setmode("online");
      socket.emit("join room", currentChat.chatId);
      setChatData(res.data.messages);
      setReRender(!reRender);
      setState(true);
      localStorage.setItem("message", JSON.stringify(res.data.messages));
    } catch (error) {
      setmode("offline");

      // alert(mode);
      let chatMessages = localStorage.getItem("message");
      if (chatMessages) {
        setChatData(JSON.parse(chatMessages));
      }
    }
  };
  useEffect(() => {
    socket.on("message received", (message: any) => {
      if (message.chat._id === currentChat.chatId) {
        setReRender(!reRender);
        setChatData((prev: any) => [message, ...prev]);
      } else {
        setNotificationState([
          ...notificationState,
          {
            chatId: message.chat._id,
            senderId: message.sender._id,
            senderName: message.sender.Name,
            message: message.content,
            read: false,
          },
        ]);
      }
    });
  }, [state]);

  useEffect(() => {
    fetchChatData();
    selectedChatCompare = currentChat.chatId;
  }, [currentChat.chatId]);

  const sendMessage = async (e: any) => {
    let res: any;
    if (!message) return alert("Please enter a message");
    if (e.key === "Enter" || e.type === "click") {
      res = await api.post(
        `/send`,
        {
          chatId: currentChat.chatId,
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );

      setTyping(false);
      socket.emit("new message", res.data.message);
      setReRender(!reRender);
      setChatData((prev: any) => [res.data.message, ...prev]);
    }
    setMessage("");

    // setTyping(true);
  };

  const handleTyping = (e: any) => {
    setMessage(e.target.value);
    let timer: any;
    if (!socketconnected) return;
    if (!typing) {
      socket.emit("typing", currentChat.chatId);
      setTyping(true);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      socket.emit("stop typing", currentChat.chatId);
      setTyping(false);
    }, 2000);
  };

  return (
    <>
      <WebCamera state={cameraon} handleOpen={setCameraOn} />
      {open && <ChatList data={open} handleOpen={setOpen} />}

      <>
        <Typography
          variant="h6"
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            borderRadius: "10px",
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          <span
            style={{
              borderRadius: "10px",
              backgroundColor: "#1e1e1e",
            }}
          >
            Chat-List
          </span>
        </Typography>
        <ChatStyled>
          <ChatContainer>
            <ChatHeader>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  // border: "1px solid red",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    // border: "1px solid red",
                  }}
                >
                  <IconButton>
                    <Person2Icon
                      sx={{
                        color: "white",
                      }}
                    />
                  </IconButton>
                  <div>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        borderRadius: "10px",
                      }}
                    >
                      chat
                      {/* {chatData.isGroupChat ? chatData.chatName : "user"} */}
                    </Typography>
                  </div>

                  <div>
                    <IconButton
                      onClick={() => {
                        setCameraOn(true);
                      }}
                    >
                      <Camera style={{ fontSize: "30px", color: "white" }} />
                    </IconButton>
                    <IconButton>
                      <Call style={{ fontSize: "30px", color: "white" }} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </ChatHeader>

            {
              <>
                <ChatBody
                  sx={{
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    scrollbarWidth: "none",
                    pt: "10px",
                    // border: "1px solid red",
                    height: {
                      xs: "500px",
                      sm: "600px",
                      md: "700px",
                      lg: "800px",

                      xl: "800px",
                    },
                  }}
                >
                  {/* chatData.sender.includes(userData?.UserExist._id) */}

                  {istyping ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        // border: "1px solid red",
                        width: "100%",
                        paddingLeft: "20px",
                      }}
                    >
                      <Lottie
                        animationData={loading}
                        height={2}
                        width={3}
                        style={{
                          height: "50px",
                          width: "60px",
                          marginLeft: "20px",
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {chatData.length > 0 &&
                    chatData.map((item: any) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            width: "100%",
                          }}
                          key={item.id}
                        >
                          {item.sender._id === userData?.UserExist._id ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                width: "100%",
                                // height: "100%",
                                // border: "1px solid red",
                              }}
                              key={item._id}
                            >
                              <Sender>
                                <SenderMSg>
                                  {item.content}
                                  <IconButton
                                    sx={{
                                      borderRadius: "50%",
                                      // border: "1px solid white",
                                    }}
                                  >
                                    <img
                                      src={item.sender.image}
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                      }}
                                    />
                                  </IconButton>
                                </SenderMSg>
                              </Sender>
                            </div>
                          ) : (
                            <Reciever>
                              <RecieverMSg>
                                <IconButton
                                  sx={{
                                    borderRadius: "50%",
                                    // border: "1px solid white",
                                  }}
                                >
                                  <img
                                    src={item.sender.image}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                </IconButton>

                                {item.content}
                              </RecieverMSg>
                            </Reciever>
                          )}
                        </div>
                      );
                    })}
                </ChatBody>
              </>
            }

            <ChatFooter>
              <IconButton>
                <Attachment
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    fontSize: "30px",
                    color: "white",
                  }}
                />
              </IconButton>

              <input
                className="msgInput"
                value={message}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",

                  outline: "none",
                  color: "white",
                }}
                onChange={(e) => {
                  handleTyping(e);
                }}
                type="text"
                placeholder="Type a message"
              />

              <IconButton onClick={sendMessage}>
                <Send
                  type="submit"
                  style={{ fontSize: "30px", color: "white" }}
                />
              </IconButton>
              <IconButton>
                <Mic style={{ fontSize: "30px", color: "white" }} />
              </IconButton>
              {/* </form> */}
            </ChatFooter>
          </ChatContainer>
        </ChatStyled>
      </>
    </>
  );
};

export default Index;
