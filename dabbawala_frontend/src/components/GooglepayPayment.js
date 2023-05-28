import GooglePayButton from '@google-pay/button-react'
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function GooglepayPayment() {
  return (
    <GooglePayButton
      environment="TEST"
      buttonSizeMode='fill'
      buttonColor='white'
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Demo Merchant',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: '100.00',
          currencyCode: 'USD',
          countryCode: 'US',
        },
      }}
      onLoadPaymentData={paymentRequest => {
        alert("Payment Succesful");
        console.log('load payment data', paymentRequest);
      }}
    />
  );
}

export default GooglepayPayment;
