import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import styled from "styled-components";

function Header({ show }) {
  const history = useHistory();
  const user = useSelector(selectUser);
  return (
    <Container
      style={{ backgroundColor: `${show ? "#121212" : "transparent"}` }}
    >
      {/* icons */}
      <Icons>
        <MdNavigateBefore
          onClick={() => history.goBack()}
          className="header__icon "
        />
        <MdNavigateNext
          onClick={() => history.goForward()}
          className="header__icon "
        />
      </Icons>

      <UserInfo>
        <div>
          <IoPersonCircleOutline className="header__icon " />
        </div>
        <div>
          <p className="mt-3 font-semibold">{user?.display_name}</p>
        </div>

        <div>
          <IoMdArrowDropdown className="header__icon " />
        </div>
      </UserInfo>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  position: sticky;
  top: 0;
  color: #fff;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -55px;
  z-index: 10;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  .header__icon {
    font-size: 30px;
  }
`;
const Icons = styled.div``;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  * {
    margin: 0 2px;
  }
  p {
    margin-bottom: 5px;
  }
`;
