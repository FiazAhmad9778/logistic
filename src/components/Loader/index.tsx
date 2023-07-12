import { Spinner } from 'react-bootstrap';

export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 py-5">
      <Spinner animation="grow" variant="primary" />
    </div>
  );
}
