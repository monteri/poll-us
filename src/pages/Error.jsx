import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="pollus__container" sx={{ display: 'flex' }}>
      <Box>
        <DoNotDisturbIcon sx={{
          mr: 1, width: '100px', height: '100px', color: 'primary.main',
        }}
        />
      </Box>

      <Typography variant="h3" color="primary.main">
        page not found
      </Typography>

      <Box mt={4}>
        <Button
          variant="contained"
          size="large"
          sx={{
            width: '230px', mt: '3', textTransform: 'lowercase', paddingLeft: '2.5rem',
          }}
          onClick={() => navigate('/')}
        >
          Back home
        </Button>
      </Box>
    </Container>
  );
}

export default Error;
