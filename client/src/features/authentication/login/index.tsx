import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { object, string } from "yup";
import TextField from "../../../component/form/TextField";
import { api } from "../../../lib/Axios";
import { userState } from "../../../recoil/Atom";
import { FormBoxStyled } from "./FormBox";

// interface FormValues {
//   email: string;
//   password: string;
// }

const Index = () => {
  const [, setUser] = useRecoilState(userState);

  let schema = object({
    email: string().email().required(),
    password: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: schema,

    onSubmit: (values) => {
      try {
        api.post("/login", values).then((res) => {
          if (res.status === 200) {
            setUser(res.data);
            localStorage.setItem("userData", JSON.stringify(res.data));
          }
        });
      } catch (error) {
        console.error({ error });
      }
    },
  });

  return (
    <>
      <FormBoxStyled
        sx={{
          background: "white",
          backdropFilter: "blur( 10px )",
          minWidth: "35%",
        }}
      >
        <h4>Login</h4>
        <form
          onSubmit={(e) => {
            formik.handleSubmit();
            e.preventDefault();
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
                variant="outlined"
                size="small"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                variant="outlined"
                size="small"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
        <Button>
          Don't have an account?
          <NavLink to={`/auth/signup`}>signup</NavLink>
        </Button>
      </FormBoxStyled>
    </>
  );
};

export default Index;
