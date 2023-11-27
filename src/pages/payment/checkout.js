import { Helmet } from "react-helmet-async";
import { Box, Card, Container } from "@mui/material";
import Logo from "../../Components/Logo";
import StripeCheckout from "../../Components/payment/StripeCheckout";

export default function Checkout() {
  return (
    <>
      <Helmet>
        <title>Plan Checkout</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="sm" sx={{ py: "80px" }}>
          <Box
            sx={{
              mb: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo
              sx={{
                height: 40,
                width: 40,
              }}
            />
          </Box>
          <Card>
            <StripeCheckout />
          </Card>
        </Container>
      </Box>
    </>
  );
}
