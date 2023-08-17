import * as React from "react";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HobbiesComponent from "./HobbiesComponent";
import axios from "axios";
import { ErrorMsg, SuccessMsg, WarnMsg } from "../../helper/notify";

export default function FormDialog({ setShowForm, showForm, getAllDetails }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [hobbies, setHobbies] = React.useState([]);

  /**
   *    Add Uset to db
   */
  const addUser = async () => {
    // validate user details
    if (name === "") return WarnMsg("Please Enter Name");
    if (email === "") return WarnMsg("Please Enter Email address");

    if (mobile == "" || isNaN(parseInt(mobile)) || mobile.length != 10)
      return WarnMsg("Enter Valid Mobile Number");

    if (hobbies.length == 0) return WarnMsg("Select atleast one hobby");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/details/addDetails",
        {
          name: name,
          email: email,
          number: mobile,
          hobbies: hobbies,
        }
      );
      if (res.data.result) {
        SuccessMsg("🎉 User Details Added successfully ");
        setShowForm(false);
        getAllDetails();
        setName("");
        setEmail("");
        setMobile("");
        setHobbies([]);
      } else {
        ErrorMsg(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   *    Form dialog JSX
   */
  return (
    <div>
      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <div className="form">
          <DialogTitle>Add User Details</DialogTitle>
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
              onClick={() => setShowForm(false)}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={addUser}>
              Add User
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
