import { Fragment } from 'react';
import Header from './common/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import { isEmpty } from 'lodash';

const Layout = () => {
  //The created store
  document.querySelector('body')?.classList.add('ltr', 'main-body', 'app', 'sidebar-mini');
  document.querySelector('body')?.classList.remove('error-page1', 'bg-primary');

  const responsiveSidebarclose = () => {
    //leftsidemenu
    if (window.innerWidth < 992) {
      document.querySelector('.app')?.classList.remove('sidenav-toggled');
    }
    //rightsidebar
    document.querySelector('.sidebar-right')?.classList.remove('sidebar-open');
    //swichermainright
    document.querySelector('.demo_changer')?.classList.remove('active');
    const Rightside: any = document?.querySelector('.demo_changer');
    if (!isEmpty(Rightside?.style)) {
      Rightside.style.right = '-270px';
    }
  };

  function Sidebargone(gone: any) {
    // If media query matches
    if (gone.matches) {
      document.querySelector('body')?.classList.add('sidebar-gone');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-gone');
      document.querySelector('body')?.classList.remove('sidenav-toggled');
    }
  }

  const gone = window.matchMedia('(max-width: 1024px)');
  Sidebargone(gone); // Call listener function at run time
  gone.addListener(Sidebargone);
  return (
    <Fragment>
      <div className="horizontalMenucontainer">
        <div className="page">
          <div className="open">
            <Header />
            <Sidebar />
          </div>
          <div
            role="presentation"
            className="main-content app-content"
            onClick={() => {
              responsiveSidebarclose();
            }}
            onKeyDown={() => {
              responsiveSidebarclose();
            }}
          >
            <div className="side-app">
              <div className="main-container container-fluid mt-4">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
