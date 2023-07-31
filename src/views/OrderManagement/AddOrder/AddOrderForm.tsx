import Button from '@/components/Button';
import Form from '@/components/Form';
import PermissionWrapper from '@/components/Permission/permission-helper';
import SearchResultBox from '@/components/SearchResultBox';
import useDebounce from '@/hooks/useDebounce';
import { ClientResponse } from '@/infrastructure/store/api/client/client-types';
import { ExternalAPI } from '@/infrastructure/store/api/mapbox/mapbox-api';
import { Feature, LocationSearchResponse } from '@/infrastructure/store/api/mapbox/mapbox-types';
import { CreateOrderRequest, OrderResponse } from '@/infrastructure/store/api/order/order-types';
import { RouteResponse } from '@/infrastructure/store/api/route/route-types';
import { useCallback, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, UseFormGetValues, UseFormReturn } from 'react-hook-form';
import { ClaimCode } from 'src/enums/claim-codes';
import SearchableMap from '@/components/SearchableMap';

interface IAddOrderForm {
  onSubmit: SubmitHandler<FieldValues>;
  initialValue?: CreateOrderRequest | OrderResponse | null | undefined;
  loadingState: boolean;
  routes?: RouteResponse[];
  clients?: ClientResponse[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
  handleSelectAddress?: (data: Feature, getValues: UseFormGetValues<CreateOrderRequest>) => void;
}
const AddOrderForm: React.FC<IAddOrderForm> = ({
  useFormReturn,
  onSubmit,
  routes,
  clients,
  loadingState,
  initialValue,
  handleSelectAddress,
}) => {
  const { reset, getValues } = useFormReturn;
  const [search, setSearch] = useState('');
  const [suggestionBox, setSuggestionBox] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<LocationSearchResponse | null>(null);
  const debouncedValue = useDebounce<string>(search, 200);

  const handleSearchValue = (value: string) => {
    if (getValues()) reset({ ...getValues(), address1: value });
    setSearch(value);
  };

  const handleSelect = (data: Feature) => {
    setSearchData(null);
    if (handleSelectAddress) {
      handleSelectAddress(data, getValues);
    }
  };

  const handleSuggestionBox = () => {
    setSuggestionBox(true);
  };
  const handleInputFocusOut = () => {
    setSuggestionBox(false);
  };

  const handleSearchAddress = useCallback(async (value: string) => {
    setSearchData(null);
    if (value.length >= 3) {
      const response = await ExternalAPI.SearchMapbox(value);
      response && setSearchData(response);
    }
  }, []);

  useEffect(() => {
    handleSearchAddress(debouncedValue);
  }, [debouncedValue, handleSearchAddress]);

  useEffect(() => {
    if (initialValue) {
      reset(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <PermissionWrapper requiredClaims={[ClaimCode.CliMgA]}>
              <Col xl={6} lg={6} md={6} sm={12}>
                <Form.Select
                  label="Client"
                  name="clientId"
                  options={clients?.map((option) => ({
                    value: option.id,
                    name: option.name,
                  }))}
                />
              </Col>
            </PermissionWrapper>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select
                label="Route"
                name="routeId"
                isClearable={true}
                options={routes?.map((option) => ({
                  value: option.id,
                  name: option.routeName,
                }))}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input
                label="Unique Reference Code"
                name="uniqueReferenceCode"
                placeholder="Enter unique reference code"
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Order Name" name="orderName" placeholder="Enter order name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Customer Name" name="customerName" placeholder="Enter customer name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Customer Email" name="customerEmail" placeholder="Enter customer email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Customer Mobile" name="customerMobile" placeholder="Enter customer mobile" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Town/City" name="townCity" placeholder="Enter town/city" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Post Code" name="postCode" placeholder="Enter post code" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Country" name="country" placeholder="Enter country" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Order Window Open" name="orderWindowOpen" type="time" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Order Window Close" name="orderWindowClose" type="time" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Type Of Order" name="typeOfOrder" placeholder="Enter type of order" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Loading Depot/Unit" name="loadingUnit" placeholder="Enter loading depot" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Depot Latitude" name="latitude" placeholder="Enter loading depot latitude" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Depot Longitude" name="longitude" placeholder="Enter depot longitude" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Product Weight (Kg)" name="productWeight" placeholder="Enter product weight" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Vehicle Type" name="vehicleType" placeholder="Enter vehicle type" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Temperature" name="temperature" placeholder="Enter temperature" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <div>
                <Form.Input
                  label="Address"
                  name="address1"
                  placeholder="Enter address"
                  onKeyUp={({ currentTarget }) => handleSearchValue(currentTarget.value)}
                  onFocus={handleSuggestionBox}
                  onBlurCapture={handleInputFocusOut}
                />
                {searchData && (
                  <SearchResultBox searchData={searchData} handleOnClick={handleSelect} suggestionBox={suggestionBox} />
                )}
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Latitude" name="latitude" placeholder="Enter latitude" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Longitude" name="longitude" placeholder="Enter longitude" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Address" name="address" placeholder="Enter address" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea
                label="Driver Delivery Instruction"
                name="deliveryInstruction"
                placeholder="Enter delivery instruction"
              />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit" loading={loadingState} disabled={loadingState}>
                Save
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              xyz
              <SearchableMap />
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddOrderForm;
