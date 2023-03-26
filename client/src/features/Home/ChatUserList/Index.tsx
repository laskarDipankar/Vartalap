import { Search } from "@mui/icons-material";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getTokenFromLocalStorage } from "../../../component/ui/chatList/ChatList";
import { api } from "../../../lib/Axios";
import { chatState, rerender, chatList } from "../../../recoil/Atom";
import CreateGroupChat from "../../../component/ui/AddGroupChat/CreateGroupChat";
import {
  ChatUserListHeaderStyled,
  ChatUserListStyled,
  ChatUsers,
  UserChats,
} from "./Styled";

const Index = () => {
  const cuser = getTokenFromLocalStorage("userData");
  const token = cuser.token;
  const [chatlist, setChatList] = useState<any[]>([]);
  const [chat, setChat] = useRecoilState(chatState);
  const selectedChatRef = useRef(chat);
  const [open, setOpen] = useState(false);
  // console.log("chatlist", chatlist);
  const reRender = useRecoilValue(rerender);
  const [, setChatListState] = useRecoilState(chatList);

  useEffect(() => {
    if (
      selectedChatRef.current.chatId !== "" &&
      selectedChatRef.current.chatId === chat.chatId
    )
      return;

    api
      .get("/fetchChat", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        selectedChatRef.current = res.data.data[chat.index];
        setChatList(res.data.data);
        localStorage.setItem("chatlist", JSON.stringify(res.data.data));
        // console.log(res.data.data, "console.log chatdat");
        setChat((prev) => ({ ...prev, chatId: res.data.data[chat.index]._id }));
        setChatListState(res.data.data);
      })
      .catch((err) => {
        let chatlist = localStorage.getItem("chatlist") || "";
        if (chatlist) {
          setChatList(JSON.parse(chatlist));
          setChatListState(JSON.parse(chatlist));
          // setChat((prev) => ({ ...prev, chatId: chatlist[chat.index]._id }));
        }
      });
  }, [reRender]);

  return (
    <>
      {/*  */}
      <CreateGroupChat state={open} handleOpen={setOpen} />
      <ChatUserListStyled
        sx={{
          display: {
            // xs: "none",
            xl: "block",
          },
        }}
      >
        <ChatUserListHeaderStyled>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // border: "2px solid red",
            }} //
          >
            <Grid item xl={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  // border: "2px solid white",
                  width: "25vw",
                }}
              >
                <Search
                  sx={{
                    color: "white",
                    fontSize: "1.8rem",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search for your Chat"
                  style={{
                    width: "70%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </ChatUserListHeaderStyled>
        <Box
          sx={{
            width: "100%",
            borderRadius: "10px",
            border: "1px solid grey",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // ml: "1rem",
          }}
        >
          <Button
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
            onClick={() => setOpen(true)}
          >
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",

                // border: "2px solid white",
                width: "1.5rem",
                height: "1.5rem",
              }}
            >
              +
            </span>
            Group Chat
          </Button>
        </Box>
        <ChatUsers>
          {chatlist.length > 0 ? (
            chatlist.map((item: any, idx: number) => {
              return (
                <UserChats>
                  <Grid
                    container
                    onClick={() => {
                      setChat({ chatId: item._id, index: idx });
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      // marginTop: "1rem",
                      padding: "1rem",
                      // border: "2px solid red",
                    }}
                  >
                    <Grid item xl={3}>
                      {!item.isGroupChat ? (
                        <>
                          {item.users.map((ite: any) => {
                            if (ite._id !== cuser.UserExist._id) {
                              return (
                                <img
                                  src={ite.image}
                                  alt="userImage"
                                  style={{
                                    marginLeft: "1rem",
                                    width: "3rem",
                                    height: "3rem",
                                    borderRadius: "50%",
                                  }}
                                />
                              );
                            }
                          })}
                        </>
                      ) : (
                        <img
                          src={"https://i.imgur.com/9YQ9Z0X.png"}
                          alt="userImage"
                          style={{
                            marginLeft: "1rem",
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xl={9}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          marginRight: "1rem",
                        }}
                      >
                        {!item.isGroupChat ? (
                          item.users.map((ite: any) => {
                            if (ite._id !== cuser.UserExist._id) {
                              return (
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    color: "white",
                                  }}
                                >
                                  {ite.name}
                                </Typography>
                              );
                            }
                          })
                        ) : (
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            {item.chatName}
                          </Typography>
                        )}
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {item.latestMessage[0] !== undefined
                            ? item.latestMessage[0].content
                            : "Text to Start COnversation"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </UserChats>
              );
            })
          ) : (
            <h1>loading</h1>
          )}
        </ChatUsers>
      </ChatUserListStyled>
    </>
  );
};

export default memo(Index);
