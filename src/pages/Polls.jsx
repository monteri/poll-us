import { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Avatar from '@mui/material/Avatar';
import { usePollStore } from '../store';
import { withAuth } from '../helpers/autoNavigation';

function Polls() {
  const navigate = useNavigate();
  const polls = usePollStore(state => state.polls);
  const getMyPolls = usePollStore(state => state.getMyPolls);

  useEffect(() => {
    getMyPolls();
  }, []);

  return (
    <Container maxWidth="md" className="pollus__polls-container" sx={{ display: 'flex', paddingTop: '100px' }}>
      <Typography variant="h2" color="primary.main" sx={{ opacity: 0.5 }}>my polls</Typography>
      {polls ? polls.map(poll => (
        <Box
          key={poll.title}
          className="pollus__polls__list-item"
          sx={{
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          onClick={() => navigate(`/polls/${poll.publishId ? poll.publishId : poll.id}`)}
        >
          <div className="pollus__dashboard-card__text-block">
            <Typography variant="h5" color="white">{poll.title}</Typography>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              {poll.publishId ? <CheckIcon /> : <DoNotDisturbIcon />}
            </Avatar>
          </div>
        </Box>
      )) : (
        <Typography variant="h4" color="primary.main">no polls yet</Typography>
      )}
    </Container>
  );
}

export default withAuth(Polls);
