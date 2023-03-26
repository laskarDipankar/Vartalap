import { Box, styled } from "@mui/material";
import { Grid } from "@mui/material";

export const FormBoxStyled = styled("div")({
  display: "flex",
  overflow: "hidden",
  overflowY: "scroll",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba( 177, 47, 168, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 10px )",
  webkitBackdropFilter: "blur( 10px )",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const FieldsBoxStyled = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});
