export interface CreateOrderRequest {
  clientGroupId: number;
  clientId: number;
  orderStatusId: number;
  routeId: number;
  signatureImage: string;
  uniqueReferenceCode: string;
  townCity: string;
  postCode: string;
  country: string;
  loadingUnit: string;
  orderWindowOpen: string;
  orderWindowClose: string;
  productWeight: string;
  vehicleType: string;
  driverDeliveryInstruction: string;
  proofOfDeliveryImage: string;
  proofOfDeliveryImage2: string;
  deliveryRecipient: string;
  typeOfOrder: string;
  isItemMissing: boolean;
  missingItemRemark: string;
  reasons: string;
  temperature: string;
  chilled: number;
  frozen: number;
  hot: number;
  orderName: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  latitude: number;
  longitude: number;
  driverPerformance: string;
  review: string;
  address1: string;
  address: string;
  rating: number;
  time: string;
  comments: string;
  ambient: string;
  collectionPersonName: string;
  isWaitingTime: boolean;
  tempratureRange: string;
  isLateDelivery: boolean;
  reasonForLateDelivery: string;
  trolliesDelivered: number;
  trolliesCollected: number;
}
export interface UpdateOrderRequest extends CreateOrderRequest {
  id: number;
}

export interface OrderInstructionsRequest {
  instruction: string;
}
export interface OrderResponse {
  orderStatusId: number;
  orderStatusName: string;
  routeId: number;
  routeName: string;
  signatureImage: string;
  uniqueReferenceCode: string;
  townCity: string;
  postCode: string;
  country: string;
  loadingUnit: string;
  orderWindowOpen: string;
  orderWindowClose: string;
  productWeight: string;
  vehicleType: string;
  driverDeliveryInstruction: string;
  proofOfDeliveryImage: string;
  proofOfDeliveryImage2: string;
  deliveryRecipient: string;
  typeOfOrder: string;
  isItemMissing: boolean;
  missingItemRemark: string;
  reasons: string;
  temperature: string;
  chilled: number;
  frozen: number;
  hot: number;
  orderName: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  latitude: string;
  longitude: string;
  driverPerformance: string;
  review: string;
  address: string;
  rating: number;
  time: string;
  comments: string;
  ambient: string;
  collectionPersonName: string;
  isWaitingTime: boolean;
  temperatureRange: string;
  isLateDelivery: boolean;
  reasonForLateDelivery: string;
  trolliesDelivered: number;
  trolliesCollected: number;
}
