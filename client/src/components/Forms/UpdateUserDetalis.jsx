import React from "react";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HobbiesComponent from "./HobbiesComponent";
import { ErrorMsg, SuccessMsg } from "../../helper/notify";
import axios from "axios";

const UpdateUserDetalis = ({
  setShowUpdateFrom,
  showUpdateForm,
  getAllDetails,
  updateUserID,
}) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [hobbies, setHobbies] = React.useState([]);

  /**
   *   Get Single User Details
   */
  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/details/getDetail/${updateUserID}`
      );
      const user = res.data.info;

      setName(user.name);
      setEmail(user.email);
      setMobile(user.number);
      setHobbies(user.hobbies);
    } catch (error) {
      ErrorMsg(error.message);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, [updateUserID]);

  const updateUser = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/details/updateDetails/${updateUserID}`,
        {
          name: name,
          email: email,
          number: mobile,
          hobbies: hobbies,
        }
      );

      if (res.data.result) {
        SuccessMsg(res.data.message);
        getAllDetails();
        setShowUpdateFrom(false);
      } else {
        ErrorMsg(res.data.message);
      }
    } catch (error) {
      ErrorMsg(error.message);
    }
  };
  return (
    <div>
      <Dialog open={showUpdateForm} onClose={() => setShowUpdateFrom(false)}>
        <div className="form">
          <DialogTitle sx={{ fontWeight: "600" }}>
            Update User Details
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="my-5 " sx={{ color: "#a2a6a3" }}>
              To add a new user to the system you will need to provide following
              information.
            </DialogContentText>
            <label htmlFor="name" className="font-semibold ml-1">
              Name*
            </label>
            <Input
              color="primary"
              disabled={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              sx={{
                fontSize: "1rem",
                bgcolor: "white",
                my: "5px",
                color: "black",
              }}
              placeholder="Name"
              size="lg"
              variant="plain"
            />
            <label htmlFor="email" className="font-semibold mx-1 mt-">
              Email Address*
            </label>
            <Input
              color="neutral"
              type="email"
              disabled={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              sx={{
                fontSize: "1rem",
                bgcolor: "white",
                py: "0px",
                color: "black",
              }}
              placeholder="Email Address"
              size="lg"
              variant="plain"
            />
            <label htmlFor="mobile" className="font-semibold m-1">
              Mobile Number*
            </label>
            <Input
              color="neutral"
              disabled={false}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              id="mobile"
              sx={{
                fontSize: "1rem",
                bgcolor: "white",
                py: "0px",
                color: "black",
              }}
              placeholder="Mobile Nubmer"
              size="lg"
              variant="plain"
            />
            <label htmlFor="email" className="font-semibold m-1">
              Hobbies*
            </label>
            <HobbiesComponent setHobbies={setHobbies} hobbies={hobbies} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowUpdateFrom(false)}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={updateUser}>
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default UpdateUserDetalis;
