import {
  Box, Button, Container, Typography,
} from '@mui/material';
import Poll from '@mui/icons-material/Poll';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

function Home() {
  const navigate = useNavigate();
  const currentUser = useAuthStore(state => state.currentUser);

  return (
    <Container maxWidth="md" className="pollus__container" sx={{ display: 'flex' }}>
      <Box>
        <Poll sx={{
          mr: 1, width: '100px', height: '100px', color: 'primary.main',
        }}
        />
      </Box>

      <Typography variant="h3" color="primary.main">
        create, customize and share your polls in a simple way
      </Typography>

      <Box mt={4}>
        <Button
          variant="contained"
          size="large"
          sx={{
            width: '230px', mt: '3', textTransform: 'lowercase', paddingLeft: '2.5rem',
          }}
          onClick={() => navigate(currentUser ? '/dashboard' : '/sign_in')}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Getting started
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
