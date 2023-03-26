import React, { useEffect, useState } from "react";

import {
  Divider,
  Drawer,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
} from "@mui/material";
import { Mail, Inbox, ChevronLeft, Search, Message } from "@mui/icons-material";
import { Box } from "@mui/system";
import { api } from "../../../lib/Axios";
import { getTokenFromLocalStorage } from "../chatList/ChatList";
import { useRecoilState } from "recoil";
import { allUser, rerender } from "../../../recoil/Atom";

interface Props {
  state: boolean;
  handleDrawer: (state: boolean) => void;
}

const DrawerComponent = ({ state, handleDrawer }: Props) => {
  // const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [, setAllUser] = useRecoilState(allUser);
  const [, setReRender] = useRecoilState<boolean>(rerender);

  const cuser = getTokenFromLocalStorage("userData");

  useEffect(() => {
    api
      .get("/alluser")
      .then((res) => {
        setUser(res.data.userExist);
        setAllUser(res.data.userExist);
        // console.log(res.data.userExist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function createChat(userID: string, cUser: string) {
    api
      .post(
        "/chat",
        { userId: userID },
        {
          headers: { Authorization: `Bearer ${cuser.token}` },
        }
      )
      .then((res) => {
        alert("Chat Created");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response.data.message);
        setReRender((prev) => !prev);
      });
  }

  // console.log(cuser.UserExist._id, "cuser");

  return (
    <>
      <Drawer
        // open={open}
        open={state}
        variant="temporary"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton>
            <ChevronLeft
              onClick={() => {
                handleDrawer(false);
              }}
            />
          </IconButton>
        </Toolbar>
        <Divider />
        <Paper
          sx={{
            // border: "1px solid red",
            height: "5%",
            width: "100%",
            display: "flex",
          }}
        >
          <IconButton>
            <Search />
          </IconButton>
          <input
            type="text"
            placeholder="Search for your Chat"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              color: "black",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Paper>

        <Divider />
        {user ? (
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user
              .filter((user: any) => {
                if (search === "") return;
                if (user.name.toLowerCase().includes(search.toLowerCase())) {
                  return user;
                }
              })
              .map((user: any) => {
                if (user._id !== cuser.UserExist._id) {
                  return (
                    <ListItem
                      button
                      key={user._id}
                      sx={{
                        width: "90%",
                        border: "1px solid red",
                      }}
                    >
                      <ListItemText primary={user.name} />
                      <IconButton
                        onClick={() => {
                          createChat(user._id, cuser.UserExist._id);
                        }}
                      >
                        <Message />
                      </IconButton>
                    </ListItem>
                  );
                }
              })}
          </List>
        ) : (
          <h1>Loading...</h1>
        )}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
