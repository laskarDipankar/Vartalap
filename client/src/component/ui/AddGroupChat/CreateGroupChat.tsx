import { Button, MenuItem, Modal, Select } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { json } from "stream/consumers";
import { api } from "../../../lib/Axios";
import { allUser } from "../../../recoil/Atom";
import SelectFieldStyled from "../../form/SelectField/Index";
import { getTokenFromLocalStorage } from "../chatList/ChatList";

interface Props {
  state: any;
  handleOpen: any;
}

const CreateGroupChat = ({ state, handleOpen }: Props) => {
  const allTheUsers = useRecoilValue(allUser);
  const cuser = getTokenFromLocalStorage("userData");
  const [users, setUsers] = React.useState<any>([]);
  const [groupName, setGroupName] = React.useState("");

  const handleCreateGroup = () => {
    api
      .post(
        "/groupChat",
        {
          alluser: JSON.stringify(users),
          chatName: groupName,
        },
        {
          headers: { Authorization: `Bearer ${cuser.token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        handleOpen(false);
      })
      .catch((err) => {
        console.log(err);
        handleOpen(false);
      });
  };

  return (
    <>
      <Modal open={state} onClose={() => handleOpen(false)}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            // border: "1px solid #fff",
          }}
          //   onClick={() => handleOpen(false)}
        >
          <Box
            sx={{
              width: "30%",
              background: "#fff",
              height: {
                xs: "50%",
                sm: "50%",
                md: "50%",
                lg: "50%",
                xl: "50%",
              },
              display: "inherit",
              p: 2,
              //   alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form
              style={{
                textAlign: "center",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateGroup();
              }}
            >
              <Box>
                <h1>Create Group</h1>
                <Select
                  sx={{
                    width: "82%",
                    height: "2.5rem",
                  }}
                  value={JSON.stringify(users)}
                  // onChange={}
                >
                  {allTheUsers.map((user) => {
                    if (
                      user._id !== cuser.UserExist._id &&
                      !users.includes(user._id)
                    )
                      return (
                        <MenuItem
                          onClick={() => setUsers([...users, user._id])}
                          value={user._id}
                        >
                          {user.name}
                        </MenuItem>
                      );
                  })}
                </Select>
              </Box>
              <input
                type="text"
                placeholder="Enter Group Name"
                style={{
                  width: "80%",
                  height: "10%",
                  border: "1px solid #000",
                  //   outline: "none",
                  background: "transparent",
                  color: "black",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  borderTop: "1px solid red",
                  pt: 1,
                  //   borderBottom: "1px solid #000",
                  width: "90%",
                  height: "20%",
                  ml: 2,
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                {/* you have added {users.length} users */}

                {allTheUsers.map((user) => {
                  if (users.includes(user._id))
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",

                            // alignItems: "center",
                            // justifyContent: "end",
                            // width: "100%",
                          }}
                        >
                          <span
                            style={{
                              //   width: "10%",

                              fontSize: "0.7rem",
                              //   border: "1px solid #000",
                            }}
                          >
                            {user.name}
                          </span>
                          <Button
                            style={{
                              color: "red",
                              fontSize: "0.6rem",
                              fontWeight: "bolder",
                            }}
                            onClick={() => {
                              setUsers(
                                users.filter((id: any) => id !== user._id)
                              );
                            }}
                          >
                            X
                          </Button>
                        </div>
                      </>
                    );
                })}
              </Box>

              <Button type="submit">Create Group</Button>
              <Button
                onClick={() => {
                  handleOpen(false);
                }}
              >
                Close
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreateGroupChat;
