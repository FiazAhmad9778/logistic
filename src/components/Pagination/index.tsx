import { Pagination as BPagination } from 'react-bootstrap';

const Pagination = () => {
  return (
    <div className="text-wrap d-flex justify-content-end">
      <div className="example border-0">
        <BPagination className=" mb-0">
          <BPagination.Item className="page-item">
            <i className="fa fa-angle-left"></i>
          </BPagination.Item>
          <BPagination.Item className="page-item active">1</BPagination.Item>
          <BPagination.Item className="page-item">2</BPagination.Item>
          <BPagination.Item className="page-item">3</BPagination.Item>
          <BPagination.Item className="page-item">
            <i className="fa fa-angle-right"></i>
          </BPagination.Item>
        </BPagination>
      </div>
    </div>
  );
};

export default Pagination;
