import { styled } from "@mui/material";
import { makeStyles } from "@mui/material";
// import

// export const UseStyles: any = makeStyles(() => ({
//   hideScrollBar: {
//     "&::-webkit-scrollbar": {
//       display: "none",
//     },
//   },
// }));

export const ChatStyled = styled("div")({
  width: "100%",
  height: "87vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#051937",
  // boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 10px )",
  webkitBackdropFilter: "blur( 10px )",
  borderRadius: "10px",
  // border: "2px solid yellow",
  // border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const ChatContainer = styled("div")({
  width: "96%",
  height: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  // background: "rgba( 177, 47, 168, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 10px )",
  webkitBackdropFilter: "blur( 10px )",
  borderRadius: "10px",
  // border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const ChatHeader = styled("div")({
  width: "100%",
  height: "8%",
  display: "flex",
  marginBottom: "10px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba( 177, 47, 168, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 10px )",
  webkitBackdropFilter: "blur( 10px )",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.20)",
  // border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const ChatBody = styled("div")({
  width: "100%",
  height: "800px",
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "end",
  // border: "1px solid rgba( 177, 47, 168, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 10px )",
  webkitBackdropFilter: "blur( 10px )",
  overflowY: "scroll",
  overflowX: "hidden",
  borderRadius: "10px",

  "::webkitScrollbar": {
    display: "none",
  },

  scrollbarWidth: "none",
  border: "1px solid rgba(255,255,255,0.20)",
  // width: 15px;
  // height: 15px;
  // border:1px solid black
  // border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const ChatFooter = styled("div")({
  width: "100%",
  height: "8%",
  marginTop: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba( 1,2,1, 0.25 )",
  // boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 10px )",
  webkitBackdropFilter: "blur( 10px )",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
  // border: "1px solid rgba(255,255,255,0.20)",
});

export const Sender = styled("div")({
  width: "99%",
  // height: "22px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "end",
  background: "transparent",
  color: "white",
  fontWeight: "bold",
  marginRight: "30px",
  marginBottom: "5px",
  marginLeft: "20px",
  // background: "rgba( 177, 47, 168, 0.25 )",
  // border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const SenderMSg = styled("div")({
  // width: "99%",
  // height: "22px",
  padding: "10px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "end",
  // background: "transparent",
  color: "white",
  fontWeight: "bold",
  marginRight: "30px",
  // marginBottom: "30px",
  background: "rgba( 177, 47, 168, 0.75 )",
  // border: "1px solid rgba( 255, 255, 255, 0.18 )",
});
export const RecieverMSg = styled("div")({
  // width: "99%",
  // height: "22px",
  padding: "10px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "end",
  // background: "transparent",
  color: "white",
  fontWeight: "bold",
  marginRight: "30px",
  // marginBottom: "30px",
  background: "rgba( 177, 47, 168, 0.25 )",
  // border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const Reciever = styled("span")({
  width: "99%",
  height: "22px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "start",
  background: "transparent",
  color: "white",
  fontWeight: "bold",
  marginRight: "90px",
  marginLeft: "20px",
  marginBottom: "40px",
  // border: "1px solid rgba( 255, 255, 255, 0.18 )",
});
