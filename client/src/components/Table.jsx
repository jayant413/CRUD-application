/**
 *   Library Imports
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import { ErrorMsg, SuccessMsg } from "../helper/notify";
import Button from "@mui/material/Button";
import FormDialog from "./AddUserForm";
import HobbiesComponent from "./HobbiesComponent";

const Table = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  /**
   *   Main Table J
   */
  return (
    <div className="mt-12 mb-8 flex flex-col gap-6 bg-transparent">
      <FormDialog
        setShowForm={setShowForm}
        showForm={showForm}
        getAllDetails={getAllDetails}
      />
      <div className="flex items-center  justify-between border-b-2 sm:mx-[3rem] sm:w-[93vw]  ">
        <Typography
          variant="h3"
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
              </tr>
            </thead>
            <tbody className="p-4">
              {userDetails.map((user, index) => {
                return (
                  <tr
                    key={index}
                    className={`bg-color-black m-3   cursor-pointer transition  hover:bg-[#a47dff] hover:text-white
            ${index % 2 === 0 ? "bg-white" : "bg-gray-200"}
            `}
                    // onClick={() =>
                    //   navigate(`/dashboard/update_employee/${emp.EmployeeID}`)
                    // }
                  >
                    {/* <td className="m-3 py-4 px-5 text-center text-sm ">
                      <input type="radio" />
                    </td> */}
                    <td className="m-3 py-4 px-5 text-center text-sm ">
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
                      {user.hobbies[0]}
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
