import { Container, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
// import React from "react";
import Navbar from "../../component/ui/Navbar/Desktop/Index";
import { Theme } from "../../theme/AppTheme";
import { ThemeProvider } from "@emotion/react";
import ChatList from "../Home/ChatUserList/Index";
import Chat from "../Home/Chat/index";

const Index = () => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "98%",
            height: "100%",
            // border: "1px solid green",

            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Navbar />
          <Container
            maxWidth="xl"
            disableGutters={true}
            sx={{
              // border: "1px solid purple",
              height: "100%",
              mt: "1rem",
            }}
          >
            <Grid
              container
              sx={{
                // border: "1px solid yellow",
                display: "flex",
                flexDirection: "row",
                height: "89vh",
              }}
            >
              <Grid
                item
                // xs={12}
                lg={4}
                md={5}
                sm={5.5}
                xl={3}
                sx={{
                  // border: "1px solid white",
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                <ChatList />
              </Grid>
              <Grid
                item
                xl={0.3}
                lg={0.5}
                md={0.5}
                sm={0.5}
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    xl: "block",
                  },
                  // border: "1px solid white",
                }}
              >
                <Divider orientation="vertical" />
              </Grid>
              <Grid item xs={12} sm={6} md={6.5} lg={7.5} xl={8.7}>
                <Chat />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Index;
