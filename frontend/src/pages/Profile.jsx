import { useState } from "react";
import { Helmet } from "react-helmet";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [updateUserProfile, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profileInfo.password !== profileInfo.password2) {
      toast.error("Passwords don't match");
    } else {
      try {
        // update API
        const res = await updateUserProfile({
          id: userInfo._id,
          name: profileInfo.name,
          email: profileInfo.email,
          password: profileInfo.password,
        }).unwrap();
        console.log(res);
        // setCredentials
        dispatch(setCredentials(res));
        // notify success
        toast.success("Update success");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Auth | Profile</title>
      </Helmet>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-4">Update Profile</h1>
          <div className="mb-4">
            <h5 style={{ fontSize: "18px", fontWeight: 500 }}>Name</h5>
            <p style={{ fontSize: "14px" }}>{userInfo.name}</p>
            <Form.Group controlId="name">
              <Form.Control
                type="name"
                placeholder="John Doe"
                value={profileInfo.name}
                name="name"
                onChange={handleChange}
                style={{ fontSize: "14px" }}
              />
            </Form.Group>
          </div>
          <div className="mb-4">
            <h5 style={{ fontSize: "18px", fontWeight: 500 }}>Email address</h5>
            <p style={{ fontSize: "14px" }}>{userInfo.email}</p>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="jdoe@gmail.com"
                value={profileInfo.email}
                name="email"
                onChange={handleChange}
                style={{ fontSize: "14px" }}
              />
            </Form.Group>
          </div>
          <div className="mb-4">
            <Form.Group controlId="password">
              <Form.Label style={{ fontSize: "18px", fontWeight: 500 }}>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={profileInfo.password}
                name="password"
                onChange={handleChange}
                style={{ fontSize: "14px" }}
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Group controlId="password2">
              <Form.Label style={{ fontSize: "18px", fontWeight: 500 }}>
                Confirm password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={profileInfo.password2}
                name="password2"
                onChange={handleChange}
                style={{ fontSize: "14px" }}
              />
            </Form.Group>
          </div>
          <Button variant="outline-primary" type="submit" className="mt-3">
            Update
          </Button>
          {isLoading && <Loader />}
        </Form>
      </FormContainer>
    </>
  );
};

export default Profile;
