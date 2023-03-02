import { Main } from './styles';

const Layout = ({ children }) => {
  // You can do any stuff here
  return (
    <>
      {/* 
        <Header /> -> Like a default header bar 
      */}
      <Main>{children}</Main>
      {/* 
        <Footer /> -> Or a default footer bar 
      */}
    </>
  );
};

export default Layout;
