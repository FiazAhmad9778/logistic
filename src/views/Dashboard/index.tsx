import Button from '@/components/Button';
import Form from '@/components/Form';
import { ClientManagementIcon, ManageDriverIcon, OrderIcon, RouteList } from '@/components/Icon';
import { Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import * as chart from './data';

const Dashboard = () => {
  const useFormReturn = useForm();

  const onSubmitFilter = () => console.log('data');
  // const onSubmitPeriodicFilter = () => console.log('data');
  return (
    <div>
      <Row>
        <Col xs={12} lg={12} xl={12} md={12}>
          <span className="main-content-title mg-b-0 mg-b-lg-1">FILTERS</span>
          <Form useFormReturn={useFormReturn} onSubmit={onSubmitFilter}>
            <Row className="mx-0 mb-4">
              <div className="col-11 ps-0">
                <div className="row">
                  <div className="col-3">
                    <Form.Input label="Date" name="date" type="date" />
                  </div>
                  <div className="col-3">
                    <Form.Select label="Route" name="route" options={[]} />
                  </div>
                  <div className="col-3">
                    <Form.Select label="Driver" name="driver" options={[]} />
                  </div>
                  <div className="col-3">
                    <Form.Select label="Client" name="client" options={[]} />
                  </div>
                </div>
              </div>
              <div className="col-1 ps-0 d-flex align-items-end mb-2">
                <Button type="submit">Search</Button>
              </div>
            </Row>
          </Form>
        </Col>
      </Row>

      <Row>
        <span className="col-12 main-content-title mg-b-0 mg-b-lg-1">Periodic Data</span>
        <Col xs={12} lg={3} xl={3} md={12}>
          <Card className="shadow-base">
            <Row>
              <div className="col-9">
                <div className="ps-4 pt-4 pe-3 pb-4">
                  <div className="">
                    <h6 className="mb-2 tx-20 tx-primary medium">65</h6>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="tx-14 font-weight-semibold mb-2">Number of Drivers</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex align-items-center h-100">
                  <ManageDriverIcon className="rounded-circle" />
                </div>
              </div>
            </Row>
          </Card>
        </Col>
        <Col xs={12} lg={3} xl={3} md={12}>
          <Card className="shadow-base">
            <Row>
              <div className="col-9">
                <div className="ps-4 pt-4 pe-3 pb-4">
                  <div className="">
                    <h6 className="mb-2 tx-20 tx-primary medium">432</h6>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="tx-14 font-weight-semibold mb-2">Number of Orders</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex align-items-center h-100">
                  <OrderIcon className="rounded-circle" />
                </div>
              </div>
            </Row>
          </Card>
        </Col>
        <Col xs={12} lg={3} xl={3} md={12}>
          <Card className="shadow-base">
            <Row>
              <div className="col-9">
                <div className="ps-4 pt-4 pe-3 pb-4">
                  <div className="">
                    <h6 className="mb-2 tx-20 tx-primary medium">26</h6>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="tx-14 font-weight-semibold mb-2">No. of Routes for Clients</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex align-items-center h-100">
                  <RouteList className="rounded-circle" />
                </div>
              </div>
            </Row>
          </Card>
        </Col>
        <Col xs={12} lg={3} xl={3} md={12}>
          <Card className="shadow-base">
            <Row>
              <div className="col-9">
                <div className="ps-4 pt-4 pe-3 pb-4">
                  <div className="">
                    <h6 className="mb-2 tx-20 tx-primary medium">24</h6>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="tx-14 font-weight-semibold mb-2">Number of Clients</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex align-items-center h-100">
                  <ClientManagementIcon className="rounded-circle" />
                </div>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={3} xl={3} md={12}>
          <Card className="shadow-base">
            <Row>
              <div className="col-9">
                <div className="ps-4 pt-4 pe-3 pb-4">
                  <div className="">
                    <h6 className="mb-2 tx-20 tx-primary medium">125</h6>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="tx-14 font-weight-semibold mb-2">Number of Deliveries</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex align-items-center h-100">
                  <ClientManagementIcon className="rounded-circle" />
                </div>
              </div>
            </Row>
          </Card>
        </Col>
        <Col xs={12} lg={3} xl={3} md={12}>
          <Card className="shadow-base">
            <Row>
              <div className="col-9">
                <div className="ps-4 pt-4 pe-3 pb-4">
                  <div className="">
                    <h6 className="mb-2 tx-20 tx-primary medium">102</h6>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="tx-14 font-weight-semibold mb-2">Number of Collections</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex align-items-center h-100">
                  <RouteList className="rounded-circle" />
                </div>
              </div>
            </Row>
          </Card>
        </Col>
        <Col xs={12} lg={3} xl={3} md={12}>
          <Card className="shadow-base">
            <Row>
              <div className="col-9">
                <div className="ps-4 pt-4 pe-3 pb-4">
                  <div className="">
                    <h6 className="mb-2 tx-20 tx-primary medium">1425</h6>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="tx-14 font-weight-semibold mb-2">Number of Customers</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex align-items-center h-100">
                  <OrderIcon className="rounded-circle" />
                </div>
              </div>
            </Row>
          </Card>
        </Col>
        <Col xs={12} lg={3} xl={3} md={12}>
          <Card className="shadow-base">
            <Row>
              <div className="col-9">
                <div className="ps-4 pt-4 pe-3 pb-4">
                  <div className="">
                    <h6 className="mb-2 tx-20 tx-primary medium">1152</h6>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="tx-14 font-weight-semibold mb-2">No. of Complete Orders</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex align-items-center h-100">
                  <ManageDriverIcon className="rounded-circle" />
                </div>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="row-sm">
        <Col sm={12} md={12}>
          <Card className=" overflow-hidden">
            <Card.Body>
              <div className="main-content-label mg-b-5">Drivers and Vehicles</div>
              <div className="chartjs-wrapper-demo">
                <Line
                  options={chart.Barchart1}
                  data={chart.barchart1data}
                  height={130}
                  className="barchart"
                  id="chartArea1"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="row-sm">
        <Col sm={12} md={6}>
          <Card className=" mg-b-md-20 overflow-hidden">
            <Card.Body>
              <div className="main-content-label mg-b-5">Deliveries and Collections</div>
              <div className="chartjs-wrapper-demo">
                <Pie data={chart.piechart} id="chartPie" className="chartjs-render-monitor w-250 h-275" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <!-- col-6 --> */}
        <Col sm={12} md={6}>
          <Card className=" overflow-hidden">
            <Card.Body>
              <div className="main-content-label mg-b-5">Delivery Time</div>
              <div className="chartjs-wrapper-demo ">
                <Doughnut data={chart.dchart} id="chartDonut" className="chartjs-render-monitor w-250 h-275" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <!-- col-6 --> */}
      </Row>
      <Row className="row-sm">
        <Col sm={12} md={6}>
          <Card className=" overflow-hidden">
            <Card.Body>
              <div className="main-content-label mg-b-5">Horizontal Bar Chart</div>
              <div className="chartjs-wrapper-demo">
                {/*<canvas id="chartBar5"></canvas>*/}
                <Bar
                  options={chart.Horizontalbarchart2}
                  data={chart.Horizontalbarchartdata2}
                  height={130}
                  className="barchart"
                  id="chartBar5"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card className=" overflow-hidden">
            <Card.Body>
              <div className="main-content-label mg-b-5">Working Hours</div>
              <div className="chartjs-wrapper-demo">
                <Bar
                  options={chart.SolidColor}
                  data={chart.SolidColordata}
                  height={130}
                  className="barchart"
                  id="chartBar1"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="row-sm">
        <Col sm={12} md={6}>
          <Card className=" mg-b-md-20 overflow-hidden">
            <Card.Body>
              <div className="main-content-label mg-b-5">Fuel Efficiency</div>
              <div className="chartjs-wrapper-demo">
                <Pie data={chart.fuelEfficiencyData} id="chartPie" className="chartjs-render-monitor w-250 h-275" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card className=" overflow-hidden">
            <Card.Body>
              <div className="main-content-label mg-b-5">Temperature</div>
              <div className="chartjs-wrapper-demo ">
                <Pie data={chart.temperatureData} id="chartPie" className="chartjs-render-monitor w-250 h-275" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="row-sm">
        <Col sm={12} md={6}>
          <Card className=" overflow-hidden">
            <Card.Body>
              <div className="main-content-label mg-b-5">Carbon Emission Efficiency</div>
              <div className="chartjs-wrapper-demo">
                <Bar
                  options={chart.carbonEmissionEfficiencyOption}
                  data={chart.carbonEmissionEfficiencyData}
                  height={130}
                  className="barchart"
                  id="chartBar5"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card className=" overflow-hidden">
            <Card.Body>
              <div className="main-content-label mg-b-5">Orders</div>
              <div className="chartjs-wrapper-demo">
                <Bar
                  options={chart.ordersOptions}
                  data={chart.ordersData}
                  height={130}
                  className="barchart"
                  id="chartBar1"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
