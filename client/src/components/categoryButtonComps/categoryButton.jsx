import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./style";
const CategoryButton = ({ name, path }) => {
  return (
    <Link to={path} style={{textDecoration: "none"}}>
      <Button role="button" tabIndex="0">{name}</Button>
    </Link>
  );
};

export default CategoryButton;