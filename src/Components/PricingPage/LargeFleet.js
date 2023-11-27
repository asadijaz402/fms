import { Box, Paper, Typography, Button, Container } from '@mui/material';

export default function LargeFleet() {
  return (
    <Container>
      <Paper elevation={0} variant="outlined">
        <Box sx={{ display: 'flex', p: 4, alignItems: 'center' }}>
          <Box flexGrow={1} pr={1}>
            <Typography variant="h6" gutterBottom>
              Have +500 assets?
            </Typography>
            <Typography variant="body1" color="primary">
              If you have a large fleet and in need of specialized features, a
              sandbox environment for testing and training, priority support
              and/or custom branding, let's chat.
            </Typography>
          </Box>
          <Box>
            <Button
              component={'a'}
              href="https://bondwest.co.uk/contact-us/"
              variant="contained"
              fullWidth
            >
              Contact
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
