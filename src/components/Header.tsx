import React from "react";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { Navbar } from "../styles/components/navbar/";

interface ChildComponentProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export const Header: React.FC<ChildComponentProps> = ({
  toggleTheme,
  isDark,
}) => {
  return (
    <Navbar>
      <h1>
        LAP<span>ES</span>
      </h1>
      <button onClick={toggleTheme}>
        {isDark ? <BsFillSunFill color="white" /> : <BsFillMoonStarsFill />}{" "}
      </button>
    </Navbar>
  );
};
