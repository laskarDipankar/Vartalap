import { Badge, Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  NavbarContainer,
  NavbarSearchBox,
  NotifAnduserContainer,
  UserProPic,
} from "./NavbarStyled";
import { Search } from "@mui/icons-material";
import { Notifications, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { notification } from "../../../../recoil/Atom";
// import { userState } from "../../../../recoil/Atom";
import DrawerComponent from "../../Drawer/DrawerComponent";
import NotificationModal from "../../NotificationModal/NotificationModal";

const getUserData = (key: string) => {
  const user = localStorage.getItem(key);
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

const Index = () => {
  const [user, setUser] = React.useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openn, setopenn] = useState<boolean>(false);

  const notificationState = useRecoilValue(notification);

  useEffect(() => {
    setUser(getUserData("userData"));
  }, []);

  return (
    <>
      <NotificationModal state={openn} handleModal={setopenn} />
      <DrawerComponent state={open} handleDrawer={setOpen} />
      <NavbarContainer>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            fontFamily: "cursive",
          }}
          to="/"
        >
          <Typography
            variant="h6"
            sx={{
              ml: "1rem",
              fontSize: {
                xs: "0.8rem",
                sm: "1.5rem",
                md: "1.5rem",
                lg: "1.5rem",
              },
              fontWeight: "bold",
            }}
          >
            Vartalap
          </Typography>
        </Link>
        <NavbarSearchBox
          sx={{
            width: {
              xs: "8rem",
              sm: "8rem",
              md: "10rem",
              lg: "15rem",
              xl: "20rem",
            },
          }}
        >
          <input
            type="text"
            onClick={() => {
              setOpen(true);
            }}
            placeholder="Search"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          />
          <Search />
        </NavbarSearchBox>
        <NotifAnduserContainer
          width={{ xs: "30%", sm: "30%", md: "30%", lg: "15%" }}
        >
          <IconButton
            sx={{
              border: "1px solid grey",

              xs: {
                height: "2rem",
                width: "2rem",
              },
              sm: {
                height: "2rem",
                width: "2rem",
              },
              xl: {
                height: "3rem",
                width: "3rem",
              },
            }}
          >
            {notificationState.length > 0 &&
            notificationState[0].message !== "" ? (
              <Stack spacing={2} direction="row">
                {notificationState.map((item: any, idx: number) => {
                  console.log(item, "notif");

                  if (item.read === false) {
                    return (
                      <Badge
                        badgeContent={notificationState.length - 1}
                        color="secondary"
                        onClick={() => {
                          setopenn(true);
                        }}
                      >
                        <Notifications
                          sx={{
                            color: "white",
                          }}
                        />
                      </Badge>
                    );
                  } else {
                    if (item.read === true && item.message !== "") {
                      return (
                        <Badge
                          badgeContent={notificationState.length - 1}
                          color="secondary"
                          onClick={() => {
                            setopenn(true);
                          }}
                        >
                          <Notifications
                            sx={{
                              color: "white",
                            }}
                          />
                        </Badge>
                      );
                    }
                  }
                })}
              </Stack>
            ) : (
              <Notifications
                sx={{
                  color: "white",
                }}
              />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              localStorage.removeItem("userData");
              window.location.reload();
              // window.location.href = "/";
            }}
          >
            {/* Logout */}
            <Logout
              sx={{
                color: "white",
              }}
            />
          </IconButton>
          <UserProPic>
            <img
              src={user?.UserExist?.image}
              alt="user"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </UserProPic>
        </NotifAnduserContainer>
      </NavbarContainer>
    </>
  );
};

export default Index;
