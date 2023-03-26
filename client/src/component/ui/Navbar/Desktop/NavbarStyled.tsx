import { Box, styled } from "@mui/material";
import { IconButton } from "@mui/material";

export const NavbarContainer = styled(Box)({
  display: "flex",
  marginTop: "0.5rem",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.4rem",
  width: "96%",
  height: "6%",
  background: "rgba( 177, 47, 168, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 10px )",
  webkitBackdropFilter: "blur( 10px )",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const NavbarLogo = styled(IconButton)({
  height: "2rem",
  width: "2rem",
  borderRadius: "50%",
  background: "rgba( 177, 47, 168, 0.25 )",
});

export const NavbarSearchBox = styled(IconButton)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  height: "2.7rem",
  margin: "0.2rem",
  borderRadius: "10px",
  background: "rgba( 177, 47, 168, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 10px )",
  webkitBackdropFilter: "blur( 10px )",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const NotifAnduserContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  //   padding: "0.2rem",
  //   position: "relative",
  //   height: "100%",
  //   boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  //   backdropFilter: "blur( 10px )",
  //   webkitBackdropFilter: "blur( 10px )",
  //   borderRadius: "10px",
  //   border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const UserProPic = styled(IconButton)({
  height: "2.7rem",
  width: "2.7rem",
  margin: "0.2rem",
  borderRadius: "50%",
  border: "1px solid grey",
  background: "rgba( 177, 47, 168, 0.25 )",
});
