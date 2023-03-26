import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./App.css";
import { getTokenFromLocalStorage } from "./component/ui/chatList/ChatList";
import { BackgroundAuthStyled } from "./layout/AppBackground/AppBackgroundStyled";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import { userState } from "./recoil/Atom";

function App() {
  const userFromState = useRecoilValue(userState);
  const user = userFromState.UserExist._id
    ? userFromState
    : getTokenFromLocalStorage("userData");

  return (
    <>
      <Router>
        <BackgroundAuthStyled>
          <Routes>
            {user?.UserExist?._id ? (
              <>
                <Route path="/" element={<Home />} />
              </>
            ) : (
              <Route path="/" element={<Authentication type="login" />} />
            )}

            <Route path="auth/:type" element={<Authentication type="" />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </BackgroundAuthStyled>
      </Router>
    </>
  );
}

export default App;
