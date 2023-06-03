import {
  Box, Container, Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { withAuth } from '../helpers/autoNavigation';

const DASHBOARD_ITEMS = [
  { name: 'my polls', href: '/polls', class: 'pollus__dashboard-card__polls' },
  { name: 'create poll', href: '/create_poll', class: 'pollus__dashboard-card__create' },
  { name: 'history', href: '/history', class: 'pollus__dashboard-card__history' },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="pollus__container" sx={{ display: 'flex' }}>
      <Typography variant="h2" color="primary.main" sx={{ opacity: 0.5, alignSelf: 'self-start' }}>dashboard</Typography>
      <Grid container spacing={2}>
        {DASHBOARD_ITEMS.map(item => (
          <Grid key={item.name} item xs={12} md={6} className="pollus__dashboard-card">
            <Box
              className={item.class}
              sx={{
                width: 420,
                height: 300,
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              onClick={() => navigate(item.href)}
            >
              <div className="pollus__dashboard-card__text-block">
                <Typography variant="h3" color="white">{item.name}</Typography>
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default withAuth(Dashboard);
