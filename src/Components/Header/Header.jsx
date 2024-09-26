import React from "react";
import Container from "../Container/Container";

const Header = () => {
  return (
    <>
      <header className="py-3 shadow bg-gray-500">
        <Container>
          <nav className="flex">
            <div className="mr-4">
              <link to="/">
                <Logo  width='70px'/>
              </link>
            </div>
            <ul><Logout/></ul>
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Header;
