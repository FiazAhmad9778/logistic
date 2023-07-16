import { Navbar, Dropdown } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGES } from '@/assets/images';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import Breadcrumb from '@/components/Breadcrumb';
import { logout } from '@/infrastructure/store/store';

export default function Header() {
  const { name } = useAppSelector((state) => state['auth']);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openCloseSidebar = () => {
    document.querySelector('body')?.classList.toggle('sidenav-toggled');
  };

  const handleLogout = () => {
    dispatch(logout());
    const path = `/auth/login`;
    navigate(path);
  };

  return (
    <Navbar className="main-header side-header sticky nav nav-item">
      <div className="main-container container-fluid">
        <div className="main-header-left ">
          <div className="responsive-logo">
            <Link to={`/`} className="header-logo ">
              <img src={IMAGES.LOGO} className="main-logo m-auto mobile-logo logo-1" alt="logo" />
            </Link>
          </div>
          <div
            className="app-sidebar__toggle app-sidebar__toggle-mobile"
            data-bs-toggle="sidebar"
            onClick={() => openCloseSidebar()}
            onKeyDown={() => openCloseSidebar()}
          >
            <Link className="open-toggle" to="#">
              <i className="header-icon fa fa-bars"></i>
            </Link>
            <Link className="close-toggle" to="#">
              <i className="header-icon fas fa-times"></i>
            </Link>
          </div>
          <div className="logo-horizontal">
            <Link to={`/`} className="header-logo">
              <img src={IMAGES.LOGO} className="mobile-logo logo-1" alt="logo" />
            </Link>
          </div>
          <div className="main-header-center ms-4 d-sm-none d-md-none d-lg-block">
            <Breadcrumb />
          </div>
        </div>
        <div className="main-header-right">
          <Navbar.Toggle className="navresponsive-toggler d-lg-none ms-auto" type="button">
            <span className="navbar-toggler-icon fa fa-ellipsis-v"></span>
          </Navbar.Toggle>
          <div className="mb-0 navbar navbar-expand-lg   navbar-nav-right responsive-navbar navbar-dark p-0">
            <Navbar.Collapse className="collapse" id="navbarSupportedContent-4">
              <ul className="nav nav-item header-icons navbar-nav-right ">
                <Dropdown className=" nav-item main-header-notification d-flex">
                  <Dropdown.Toggle className="new nav-link" variant="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="header-icon-svgs"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />
                    </svg>
                    <span className=" pulse"></span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="slid1">
                    <div className="menu-header-content text-start border-bottom">
                      <div className="d-flex">
                        <h6 className="dropdown-title mb-1 tx-15 font-weight-semibold">Notifications</h6>
                        <span className="badge badge-pill badge-warning ms-auto my-auto float-end">Mark All Read</span>
                      </div>
                      <p className="dropdown-title-text subtext mb-0 op-6 pb-0 tx-12 ">
                        You have 4 unread Notifications
                      </p>
                    </div>
                    <Scrollbars style={{ height: 280 }}>
                      <div className="main-notification-list Notification-scroll">
                        <Dropdown.Item className="d-flex p-3 border-bottom" href={`/`}>
                          <div className="notifyimg bg-pink">
                            <i className="far fa-folder-open text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">New files available</h5>
                            <div className="notification-subtext">10 hour ago</div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3  border-bottom" href={`/`}>
                          <div className="notifyimg bg-purple">
                            <i className="fab fa-delicious text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">Updates Available</h5>
                            <div className="notification-subtext">2 days ago</div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3 border-bottom" href={`/`}>
                          <div className="notifyimg bg-success">
                            <i className="fa fa-cart-plus text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">New Order Received</h5>
                            <div className="notification-subtext">1 hour ago</div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3 border-bottom" href={`/`}>
                          <div className="notifyimg bg-warning">
                            <i className="far fa-envelope-open text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">New review received</h5>
                            <div className="notification-subtext">1 day ago</div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3 border-bottom" href={`/`}>
                          <div className="notifyimg bg-danger">
                            <i className="fab fa-wpforms text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">22 verified registrations</h5>
                            <div className="notification-subtext">2 hour ago</div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3 border-bottom" href={`/`}>
                          <div className="">
                            <i className="far fa-check-square text-white notifyimg bg-success"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">Project has been approved</h5>
                            <span className="notification-subtext">4 hour ago</span>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                      </div>
                    </Scrollbars>
                    <div className="dropdown-footer">
                      <Link className="btn btn-primary btn-sm btn-block" to={`/`}>
                        VIEW ALL
                      </Link>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="main-profile-menu nav nav-item nav-link ps-lg-2">
                  <Dropdown.Toggle className="new nav-link profile-user d-flex" variant="">
                    <img alt="" src={IMAGES.FACES_1} className="" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="menu-header-content p-3 border-bottom">
                      <div className="d-flex wd-100p">
                        <div className="ms-3 my-auto">
                          <h6 className="tx-15 font-weight-semibold mb-0">{name}</h6>
                        </div>
                      </div>
                    </div>
                    <Dropdown.Item className="dropdown-item" href={`/`}>
                      <i className="far fa-user-circle"></i>Profile
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href={`/`}>
                      <i className="far fa-sun"></i> Settings
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" onClick={handleLogout}>
                      <i className="far fa-arrow-alt-circle-left"></i> Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </Navbar.Collapse>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

Header.propTypes = {};

Header.defaultProps = {};
