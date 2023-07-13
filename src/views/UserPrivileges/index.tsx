import Button from '@/components/Button';
import Form from '@/components/Form';
import {
  toggleDeleteNewRoleDialog,
  toggleNewRoleDialog,
} from '@/infrastructure/store/features/user-privileges/user-privileges-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AddRoleDialog from './RoleDialog/AddRoleDialog';
import DeleteRoleDialog from './RoleDialog/DeleteRoleDialog';
import {
  useLazyClaimGroupListingQuery,
  useRoleListingQuery,
  useSaveRoleMutation,
} from '@/infrastructure/store/api/user-previleges/user-privileges-api';
import { ClaimGroupRequest, RoleResponse } from '@/infrastructure/store/api/user-previleges/user-privileges-types';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { HandleNotification } from '@/components/Toast';

const UserPrivileges = () => {
  const { newRoleDialog, deleteRoleDialog } = useAppSelector((state) => state['user']);
  const useDropdownFormReturn = useForm();
  const useFormReturn = useForm();
  const dispatch = useAppDispatch();
  const { data: roleList } = useRoleListingQuery(null);
  const [getClaimGroup, { data: claimGroupData, isLoading: IsClaimGroupListLoading }] = useLazyClaimGroupListingQuery();
  const [saveRole, saveRoleState] = useSaveRoleMutation();
  const [claimGroupList, setClaimGroupList] = useState<ClaimGroupRequest[]>([]);

  const handleNewRoleDialog = () => {
    dispatch(toggleNewRoleDialog(false));
  };
  const handleDeleteRoleDialog = () => {
    dispatch(toggleDeleteNewRoleDialog(false));
  };
  const handleOnChangeRole = (value: SingleValue<{ value: number; name: string }>) => {
    getClaimGroup(value?.value);
    useDropdownFormReturn.setValue('roleId', value?.value);
    useDropdownFormReturn.setValue('roleName', value?.name);
  };

  useEffect(() => {
    if (claimGroupData && claimGroupData.data) {
      setClaimGroupList(claimGroupData.data);
    }
  }, [claimGroupData]);

  const handleClaimGroup = async () => {
    const claims = useFormReturn.getValues();
    if (claims) {
      const assignedClaims = Object.keys(claims).reduce((array: number[], key) => {
        if (claims[key]) {
          array.push(parseInt(key));
        }
        return array;
      }, []);
      const payload = {
        roleId: useDropdownFormReturn.getValues('roleId'),
        roleName: useDropdownFormReturn.getValues('roleName'),
        claims: assignedClaims,
      };
      const res = await saveRole(payload).unwrap();
      if (res.success === true) {
        HandleNotification(res.message || 'Role updated successfully.', res.success);
      } else {
        HandleNotification(res?.errors[0], res.success);
      }
    }
  };

  const handleClaimChange = (event: any, claimId: number) => {
    const isChecked = event.target.checked;
    const updatedClaimsData = claimGroupList?.map((item) => {
      const updatedClaims = item.claims.map((claim) => {
        if (claim.claimId === claimId) {
          return { ...claim, isAssigned: isChecked };
        }
        return claim;
      });
      return { ...item, claims: updatedClaims };
    });
    setClaimGroupList(updatedClaimsData);
  };

  const loading = IsClaimGroupListLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Body className="pt-4">
            <Row>
              <Col md={6}>
                <Form useFormReturn={useDropdownFormReturn} onSubmit={(e) => console.log(e)}>
                  <Form.Select
                    name="roleId"
                    options={roleList?.data?.map((option: RoleResponse) => ({
                      value: option.id,
                      name: option.name,
                    }))}
                    onChange={handleOnChangeRole}
                  />
                </Form>
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-end mb-3">
                  <Button
                    type="submit"
                    btnType="btn-outline-danger"
                    className="me-2"
                    icon={<i className="far fa-trash-alt"></i>}
                    onClick={() => dispatch(toggleDeleteNewRoleDialog(true))}
                  >
                    {'Delete Role'}
                  </Button>
                  <Button
                    type="submit"
                    btnType="btn-outline-primary"
                    icon={<i className="fa fa fa-plus"></i>}
                    btnSize="btn-sm"
                    className="me-2"
                    onClick={() => handleClaimGroup()}
                    loading={saveRoleState.isLoading}
                    disabled={saveRoleState.isLoading}
                  >
                    {'Save Changes'}
                  </Button>
                  <Button
                    type="submit"
                    btnType="btn-outline-primary"
                    icon={<i className="fa fa fa-plus"></i>}
                    btnSize="btn-sm"
                    onClick={() => dispatch(toggleNewRoleDialog(true))}
                  >
                    {'New Role'}
                  </Button>
                  <div>
                    <DeleteRoleDialog
                      roleList={roleList?.data}
                      isOpen={deleteRoleDialog}
                      setCloseDialog={handleDeleteRoleDialog}
                      useDropdownFormReturn={useDropdownFormReturn}
                    />
                    <AddRoleDialog isOpen={newRoleDialog} setCloseDialog={handleNewRoleDialog} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              {loading ? (
                <Loader />
              ) : (
                <Form
                  useFormReturn={useFormReturn}
                  onSubmit={(e) => {
                    console.log(e);
                  }}
                >
                  <React.Fragment>
                    <Row>
                      {useDropdownFormReturn.getValues('roleId') &&
                        roleList?.data?.map((item) => item.id).includes(useDropdownFormReturn.getValues('roleId')) &&
                        claimGroupList &&
                        claimGroupList?.map((item) => (
                          <Col md={4} key={item.claimGroupName} className="my-3">
                            <div className="h-100">
                              <div className="border bd-primary br-ts-5 br-te-5">
                                <p className="tx-15 tx-semibold px-4 mb-0 py-2 bg-primary tx-white br-ts-3 br-te-3">
                                  {item.claimGroupName}
                                </p>
                              </div>
                              <div className="border privileges-body br-bs-5 br-be-5">
                                {item.claims.map((item) => {
                                  return (
                                    <div
                                      key={item.claimId}
                                      className="d-flex justify-content-between align-items-center privileges-form-checkbox my-3"
                                    >
                                      <p className="mb-0">
                                        {privilegesIcon[item.claimValue as keyof typeof privilegesIcon]}
                                        {item.claimValue}
                                      </p>
                                      <Form.Checkbox
                                        id={item.claimId}
                                        name={item.claimId.toString()}
                                        checked={item.isAssigned}
                                        onChange={(event) => handleClaimChange(event, item.claimId)}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </Col>
                        ))}
                    </Row>
                  </React.Fragment>
                </Form>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UserPrivileges;

const privilegesIcon = {
  Add: <i className="far fa-plus-square me-1 tx-primary"></i>,
  Edit: <i className="fa fa-edit me-1 tx-primary"></i>,
  View: <i className="fas fa-eye me-1 tx-primary"></i>,
  Delete: <i className="far fa-trash-alt me-1 tx-primary"></i>,
};
