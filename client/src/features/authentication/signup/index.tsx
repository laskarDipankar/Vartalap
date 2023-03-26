import React from "react";
import {
  FormBoxStyled,
  FieldsBoxStyled,
} from "../../authentication/signup/FormSignupBox";
import TextField from "../../../component/form/TextField";
import SelectField from "../../../component/form/SelectField/Index";
import { useFormik } from "formik";
import { Button, Grid, Input } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { api } from "../../../lib/Axios";
import { useNavigate } from "react-router-dom";

interface SignupFormValues {
  Name: string;
  age: number;
  // gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
}

const Gender = ["Male", "Female", "Others"];

const Index = () => {
  const [selected, setSelected] = React.useState<any>(null);
  const navigate = useNavigate();
  const signupSchema = Yup.object().shape({
    Name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    age: Yup.number()
      .required("Age is required")
      .min(18, "Age must be at least 18 years")
      .max(100, "Age must be at most 100 years"),
    // Gender: Yup.string().required("gender is must"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required"),
    profilePicture: Yup.string().required("Profile picture is required"),
  });

  const handleImageChange = (e: any) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    const reader = new FileReader();

    console.log(e.target.name);
    reader.onloadend = () => {
      setSelected(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // console.log(selected);
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      Name: "",
      age: 0,
      // gender: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      if (
        values.Name === "" ||
        values.age === 0 ||
        values.email === "" ||
        values.password === "" ||
        values.confirmPassword === "" ||
        selected === ""
      ) {
        alert("Please fill all the fields");
      }
      if (values.password !== values.confirmPassword) {
        alert("Password and confirm password must be same");
      }
      api
        .post("/signup", {
          name: values.Name,
          age: values.age,
          email: values.email,
          password: values.password,
          image: selected,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            navigate("/");
          }

          // alert("Signup successfully");
        });

      // console.log(values, selected);
    },
    // validationSchema: signupSchema,
  });

  return (
    <>
      <FormBoxStyled
        sx={{
          background: "white",
          height: {
            xs: "80%",
            sm: "80%",
            lg: "74%",
          },
          minWidth: {
            xs: "45%",
            sm: "45%",
          },
          maxWidth: {
            md: "30%",
            lg: "30%",
            xl: "30%",
          },
        }}
      >
        <h4>Signup</h4>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FieldsBoxStyled>
                <TextField
                  label="Name"
                  type="text"
                  name="Name"
                  placeholder="Enter your name"
                  variant={"outlined"}
                  size="small"
                  fullWidth
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  error={formik.touched.Name && Boolean(formik.errors.Name)}
                  helperText={formik.touched.Name && formik.errors.Name}
                />
              </FieldsBoxStyled>
            </Grid>
            <Grid item xs={12}>
              <FieldsBoxStyled>
                <TextField
                  label="Age"
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  variant={"outlined"}
                  size="small"
                  fullWidth
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
              </FieldsBoxStyled>
            </Grid>
            {/* <Grid item xs={12}>
              <FieldsBoxStyled>
                <SelectField
                  label="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  value={formik.handleChange}
                  size="small"
                  fullWidth
                  options={Gender}
                />
              </FieldsBoxStyled>
            </Grid> */}
            <Grid item xs={12}>
              <FieldsBoxStyled>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  variant={"outlined"}
                  size="small"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FieldsBoxStyled>
            </Grid>
            <Grid item xs={12}>
              <FieldsBoxStyled>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  variant={"outlined"}
                  size="small"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </FieldsBoxStyled>
            </Grid>
            <Grid item xs={12}>
              <FieldsBoxStyled>
                <TextField
                  label="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  variant={"outlined"}
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </FieldsBoxStyled>
            </Grid>
            <Grid item xs={12}>
              <FieldsBoxStyled>
                <Input
                  type="file"
                  name="profilePicture"
                  // onChange={formik.handleChange}
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                  // value={formik.values.profilePicture}
                  hidden
                />
              </FieldsBoxStyled>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                color: "white",
                width: "40%",
                marginTop: "10px",
              }}
            >
              Signup
            </Button>
          </Box>
        </form>
        <Button>
          Already have an account?
          <Link to="/auth/login"> Login</Link>
        </Button>
      </FormBoxStyled>
    </>
  );
};

export default Index;
