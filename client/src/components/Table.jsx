/**
 *   Library Imports
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddUserForm from "./Forms/AddUserForm";
import DeleteUserForm from "./Forms/DeleteUserForm";
import UpdateUserDetalis from "./Forms/UpdateUserDetalis";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { ErrorMsg, SuccessMsg } from "../helper/notify";

const Table = () => {
  const [sendEmailTo, setSendEmailTo] = useState("info@redpositive.in");
  const [userDetails, setUserDetails] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showUpdateForm, setShowUpdateFrom] = useState(false);
  const [UserID, setUserID] = useState("");
  const [selectedDetails, setSelectedDetails] = useState([]);

  /**
   *   Get all User Details
   */
  const getAllDetails = async () => {
    try {
      const res = await axios(
        "http://localhost:8000/api/v1/details/getAllDetails"
      );
      setUserDetails(res.data.response);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   *    Component Did Mount
   */
  useEffect(() => {
    getAllDetails();
  }, []);
  useEffect(() => {
    console.log(selectedDetails);
  }, [selectedDetails]);

  /**
   *    Check box handler
   */
  const handleCheckboxChange = (userId) => (event) => {
    if (event.target.checked) {
      const selectedUser = userDetails.find((user) => user._id === userId);
      setSelectedDetails((prevSelected) => [...prevSelected, selectedUser]);
    } else {
      setSelectedDetails((prevSelected) =>
        prevSelected.filter((user) => user._id !== userId)
      );
    }
  };

  /**
   *    Send Mail
   */
  const sendMail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/mail/sendMail",
        {
          selectedDetails: selectedDetails,
          sendEmailTo: sendEmailTo,
        }
      );
      SuccessMsg("🥳 Email sent successfully ");
    } catch (error) {
      console.log(error.message);
      ErrorMsg("Something went wrong Please try again later !!");
    }
  };

  /**
   *   Main Table J
   */
  return (
    <div className="mt-12 mb-8 flex flex-col gap-6 bg-transparent">
      <AddUserForm
        setShowForm={setShowForm}
        showForm={showForm}
        getAllDetails={getAllDetails}
      />
      <DeleteUserForm
        showDeleteForm={showDeleteForm}
        setShowDeleteForm={setShowDeleteForm}
        deleteUserID={UserID}
        getAllDetails={getAllDetails}
      />
      <UpdateUserDetalis
        setShowUpdateFrom={setShowUpdateFrom}
        showUpdateForm={showUpdateForm}
        updateUserID={UserID}
        getAllDetails={getAllDetails}
      />
      <div>
        <label
          htmlFor="sendEmailTo"
          className=" ml-[3.2rem] text-xl font-bold  "
        >
          Send Details to this email
        </label>
        <div className="flex ml-[3rem] mt-2">
          <input
            id="sendEmailTo"
            type="text"
            value={sendEmailTo}
            onChange={(e) => {
              setSendEmailTo(e.target.value);
            }}
            className="min-w-[30%] px-3 rounded-md outline-none"
            placeholder="Send to this email"
            disabled={!edit}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: `${edit ? " " : "#a5a3aa"}`,
              color: `${edit ? "white" : "black"}`,
              width: "10%",
              marginLeft: "3rem",
              ":hover": {
                color: "white",
              },
            }}
            onClick={() => setEdit(!edit)}
          >
            {!edit ? <EditIcon className="mr-2" /> : ""}
            {edit ? <SaveIcon className="mr-2" /> : ""}

            {edit ? "Save" : "Edit"}
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#8a5bf7",
              width: "10%",
              marginLeft: "3rem",
              ":hover": {
                bgcolor: "#7239f9",
              },
            }}
            onClick={() => {
              if (selectedDetails.length !== 0) {
                sendMail();
              } else {
                ErrorMsg("Please select details to send mail 🙂");
              }
            }}
          >
            Send Mail
          </Button>
        </div>
      </div>
      <div className="flex items-center  justify-between border-b-2 sm:mx-[3rem] sm:w-[93vw]  ">
        <Typography
          variant="h5"
          className="cursor-default  text-[1.5rem] text-[#39aff8] hover:text-[#7239f9] hover:shadow-xl md:text-[2rem]"
        >
          <span className="font-semibold">User Details</span>
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#8a5bf7",
            ":hover": {
              bgcolor: "#7239f9",
            },
          }}
          onClick={() => setShowForm(true)}
        >
          Add User
        </Button>
      </div>

      <div className=" px-10">
        <div className="flex  justify-center overflow-x-scroll  rounded-[15px] md:w-[100%]  ">
          <table className="w-full">
            <thead className="cursor-default bg-[#654afb] pt-5 text-white">
              <tr>
                {/* <th></th> */}
                <th className="p-5 text-center text-sm font-semibold ">
                  Sr No.
                </th>
                <th className="p-5 text-center text-sm font-semibold ">
                  User Name
                </th>
                <th className="p-5 text-center text-sm font-semibold ">
                  Email
                </th>
                <th className="p-5 text-center text-sm font-semibold ">
                  Mobile No.
                </th>
                <th className="p-5 text-center text-sm font-semibold ">
                  Hobbies
                </th>
                <th className="p-5 text-center text-sm font-semibold ">
                  Update
                </th>
                <th className="p-5 text-center text-sm font-semibold ">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="p-4">
              {userDetails.map((user, index) => {
                return (
                  <tr
                    key={index}
                    className={`bg-color-black m-3   cursor-default transition  hover:bg-[#a47dff] hover:text-white
            ${index % 2 === 0 ? "bg-white" : "bg-gray-200"}
            `}
                  >
                    {/* <td className="m-3 py-4 px-5 text-center text-sm ">
                      <input type="radio" />
                    </td> */}
                    <td className="m-3 py-4 px-5 text-center text-sm ">
                      <Checkbox
                        onChange={handleCheckboxChange(user._id)}
                        color="primary"
                      />
                      {index + 1}
                    </td>
                    <td className="m-3 py-4 px-5 text-center text-sm ">
                      {user.name}
                    </td>
                    <td className="m-3 py-4 px-5 text-center text-sm ">
                      {user.email}
                    </td>
                    <td className="m-3 py-4 px-5 text-center text-sm ">
                      {user.number}
                    </td>
                    <td className="m-3 py-4 px-5 text-center text-sm ">
                      {user.hobbies.map((hobby, index) => {
                        return (
                          <span key={index}>
                            {hobby}
                            {user.hobbies.length == index + 1 ? "" : ","}{" "}
                          </span>
                        );
                      })}
                    </td>
                    <td className="m-3 py-4 px-5 text-center text-sm ">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setUserID(user._id);
                          setShowUpdateFrom(true);
                        }}
                      >
                        Update
                      </Button>
                    </td>
                    <td className="m-3 py-4 px-5 text-center text-sm ">
                      <IconButton
                        // onClick={() => handleDeleteHobby(index)}
                        aria-label="delete"
                        onClick={() => {
                          setUserID(user._id);
                          setShowDeleteForm(true);
                        }}
                      >
                        <DeleteIcon className="text-red-700 hover:text-red-500 " />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
