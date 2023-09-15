import React, { useState } from "react";

interface BoxProps {
  onAddBox: (name: string, description: string) => void;
}

const Box: React.FC<BoxProps> = ({ onAddBox }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addBox = () => {
    if (name && description) {
      onAddBox(name, description);
      setName("");
      setDescription("");
    }
  };

  return "daw";
};

export default Box;
