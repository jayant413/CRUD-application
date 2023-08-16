import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Input from "@mui/joy/Input";

function HobbiesComponent({ setHobbies, hobbies }) {
  const [newHobby, setNewHobby] = useState("");

  const handleAddHobby = () => {
    if (newHobby) {
      setHobbies([...hobbies, newHobby]);
      setNewHobby("");
    }
    console.log(hobbies);
  };

  const handleDeleteHobby = (index) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
  };

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Input
          color="primary"
          disabled={false}
          id="name"
          sx={{
            fontSize: "1rem",
            bgcolor: "white",
            my: "5px",
            color: "black",
          }}
          placeholder="Hobbie"
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
          size="lg"
          variant="plain"
        />
        <IconButton onClick={handleAddHobby} aria-label="add">
          <AddIcon />
        </IconButton>
      </Box>
      <ul className="mt-2">
        {hobbies?.map((hobby, index) => (
          <li
            key={index}
            className="flex justify-between w-[40%] bg-gray-600 px-4  my-2 items-center rounded-xl "
          >
            <span>{hobby}</span>
            <IconButton
              onClick={() => handleDeleteHobby(index)}
              aria-label="delete"
            >
              <DeleteIcon className="text-red-700" />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HobbiesComponent;
