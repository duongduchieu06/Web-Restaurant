import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonBox } from "./style";
const CategoryButton = ({ name, path }) => {
  return (
    <ButtonBox>
        <Link to={path} style={{textDecoration: "none", height: "100%"}}>
          <Button role="button" tabIndex="0">{name}</Button>
        </Link>
    </ButtonBox>
  );
};

export default CategoryButton;