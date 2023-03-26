import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserChats } from "../../../features/Home/ChatUserList/Styled";
import { api } from "../../../lib/Axios";
import { chatList, chatState } from "../../../recoil/Atom";

interface Props {
  data: boolean;
  handleOpen: any;
}

export const getTokenFromLocalStorage = (key: "userData") => {
  try {
    const token = localStorage.getItem(key);
    if (token) return JSON.parse(token);
    return null;
  } catch (e) {
    return null;
  }
};

const ChatList = ({ data, handleOpen }: Props) => {
  const [chatlist, setChatList] = useState<any[]>([]);
  const [chat, setChat] = useRecoilState(chatState);
  const currentChat = useRecoilValue(chatState);
  const cuser = getTokenFromLocalStorage("userData");
  const token = cuser?.token;

  const cchatlist = useRecoilValue(chatList);

  useEffect(() => {
    api
      .get("/fetchChat", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setChatList(res.data.data);
      });
  }, [currentChat.chatId]);

  return (
    <>
      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
          background: "transparent",
        }}
        variant="temporary"
        anchor="top"
        open={data}
        // onClose={() => {}}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Toolbar
          sx={{
            background: "transparent",
          }}
        >
          <IconButton onClick={() => {}}>
            <ChevronLeft
              onClick={() => {
                handleOpen(false);
              }}
            />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Chat List
          </Typography>
        </Toolbar>
        <Divider />
        {cchatlist.length > 0 ? (
          cchatlist.map((item: any, idx: number) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  width: "25rem",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  //   border: "2px solid red",
                }}
              >
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
                      <img
                        src={item.users[1].image}
                        alt="userImage"
                        style={{
                          marginLeft: "1rem",
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "50%",
                        }}
                      />
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
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {!item.isGroupChat
                            ? item.users[1].name
                            : item.chatName}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {}
                          {item.latestMessage[0] !== undefined
                            ? item.latestMessage[0].content
                            : "Text to Start COnversation"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </UserChats>
              </Box>
            );
          })
        ) : (
          <h1>loading</h1>
        )}

        <Divider />
        <List></List>
      </Drawer>
    </>
  );
};

export default ChatList;
