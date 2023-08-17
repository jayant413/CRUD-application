import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { ErrorMsg, SuccessMsg } from "../../helper/notify";
import axios from "axios";

const DeleteUserForm = ({
  showDeleteForm,
  setShowDeleteForm,
  deleteUserID,
  getAllDetails,
}) => {
  /**
   *   handle delete
   */
  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/details/deleteDetails/${deleteUserID}`
      );

      if (res.data.result) {
        SuccessMsg("User deleted successfully  ");
        setShowDeleteForm(false);
        getAllDetails();
      } else {
        ErrorMsg(res.data.message);
      }
    } catch (error) {
      ErrorMsg(error.message);
    }
  };
  /**
   *    Delete user form
   */
  return (
    <div>
      <Dialog open={showDeleteForm} onClose={() => setShowDeleteForm(false)}>
        <div className="form">
          <DialogTitle sx={{ fontWeight: "600" }}>
            Confirm to Delete User Details !!
          </DialogTitle>

          <DialogActions>
            <Button
              onClick={() => setShowDeleteForm(false)}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteUser}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteUserForm;
