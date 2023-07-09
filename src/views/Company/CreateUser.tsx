import Button from '@/components/Button';
import Form from '@/components/Form';
import { Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserResolver } from 'src/form-resolver/create-user-resolver';

const CreateUser = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(createUserResolver),
  });
  const navigate = useNavigate();

  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add User</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <Row>
              <Col md={{ span: 6, offset: 1 }}>
                <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12}>
                      <Form.Input label="First Name" name="firstName" placeholder="User first name" />
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12}>
                      <Form.Input label="Last Name" name="lastName" placeholder="User last name" />
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12}>
                      <Form.Input label="Email" name="email" placeholder="Email" />
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12}>
                      <Form.Input label="Mobile" name="mobile" placeholder="Mobile" />
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12}>
                      <Form.Select
                        label="Role"
                        name="role"
                        options={[
                          { value: 'Admin', name: 'Admin' },
                          { value: 'Customer', name: 'Customer' },
                        ]}
                      />
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12}>
                      <Form.Select
                        label="To"
                        name="to"
                        isMulti
                        isSearchable={false}
                        options={[
                          { value: 'David', name: 'David' },
                          { value: 'Miller', name: 'Miller' },
                        ]}
                      />
                    </Col>
                    <Col md={12} className="d-flex justify-content-end mt-2">
                      <Button
                        type="button"
                        className="me-2"
                        onClick={() =>
                          useFormReturn.reset({
                            role: '',
                            to: [],
                          })
                        }
                      >
                        Reset
                      </Button>
                      <Button>Save</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateUser;
