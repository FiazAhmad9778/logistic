import React from 'react';
import { classNames } from '@/helpers/classNames';
import { Link, useLocation } from 'react-router-dom';

type Path = {
  name: string;
  path: string;
  active: boolean;
};

interface IBreadcrumb {
  breadcrumbTitle?: string;
  breadcrumbPath?: Path[];
  button?: React.ReactNode;
}

const Breadcrumb: React.FC<IBreadcrumb> = ({ button }) => {
  const location = useLocation();

  let currentLink = '';
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index) => {
      currentLink += `/${crumb}`;
      const newCrumb = crumb
        .split('-')
        .filter((crumb) => crumb !== '')
        .map((item) => ` ${item.toLocaleUpperCase()}`);

      return (
        <span key={crumb} className="mb-0">
          <Link
            to={currentLink}
            className={classNames(
              location.pathname.split('/').filter((crumb) => crumb !== '').length === 1
                ? 'text-primary'
                : currentLink === location.pathname && 'text-primary',
              'tx-gray-600 font-weight-semibold tx-14',
            )}
          >
            {index !== 0 && (
              <svg className="ms-1 mb-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <g transform="rotate(180 12 12) translate(24 0) scale(-1 1)">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m13 17l5-5l-5-5M6 17l5-5l-5-5"
                  />
                </g>
              </svg>
            )}
            <span>{newCrumb}</span>
          </Link>
        </span>
      );
    });
  return (
    <div aria-label="breadcrumb" className="d-flex align-item-center justify-content-between">
      <span></span>
      <div className="mb-0 mg-b-0 d-flex align-items-center">
        <span>{crumbs}</span>
      </div>
      {button && <div className="d-flex align-items-center">{button}</div>}
    </div>
  );
};

export default Breadcrumb;
