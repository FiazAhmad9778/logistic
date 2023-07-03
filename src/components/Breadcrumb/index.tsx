import React from 'react';
import { Card, Breadcrumb as Breadcrumbs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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

const Breadcrumb: React.FC<IBreadcrumb> = ({ breadcrumbTitle, breadcrumbPath, button }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <Card.Body className="py-2">
        <div aria-label="breadcrumb" className="d-flex align-item-center justify-content-between">
          <Breadcrumbs className="mb-0 mg-b-0">
            {breadcrumbPath &&
              breadcrumbPath.map((item) => (
                <Breadcrumbs.Item
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="mb-0"
                  active={item.active}
                >
                  {item.name}
                </Breadcrumbs.Item>
              ))}
            {breadcrumbTitle && (
              <Breadcrumbs.Item href="#" className="mb-0" active={true}>
                {breadcrumbTitle}
              </Breadcrumbs.Item>
            )}
          </Breadcrumbs>
          {button && <div className="d-flex align-items-center">{button}</div>}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Breadcrumb;
