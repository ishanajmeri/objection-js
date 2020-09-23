import React from 'react';
import Navbar from './navbar/navbar';

const MainLayout = (props) => {
  return (
    <div>
        <Navbar
          path={props.children.props.match.path}
          name={props.children.type.name}
        />
        <main>
          {/* {childern} */}
          {props.children}
        </main>
    </div>
  );
};

export default MainLayout;
