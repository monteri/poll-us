import { useEffect, useState } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { usePollStore } from '../store';
import { withAuth } from '../helpers/autoNavigation';
import Error from './Error';

function PollDetail() {
  const params = useParams();
  const [poll, setPoll] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getPoll = usePollStore(state => state.getPoll);

  useEffect(() => {
    setLoading(true);
    getPoll(params.id).then(([pollData]) => {
      if (!pollData) {
        setError(true);
      }
      setPoll(pollData);
      setLoading(false);
    });
  }, []);

  return error ? <Error /> : (
    <Container maxWidth="md" className="pollus__polls-container" sx={{ display: 'flex', paddingTop: '100px' }}>
      {loading ? (
        <Typography variant="h5" color="primary.main" sx={{ opacity: 0.5 }}>Loading...</Typography>
      ) : (
        <>
          <Typography variant="h3" color="primary.main">{poll.title}</Typography>
          <Grid container>
            <Typography
              color="primary.main"
              fontWeight={700}
              variant="h5"
            >
              type:&nbsp;
            </Typography>
            <Typography
              color="primary.main"
              variant="h5"
            >
              {poll.type}
            </Typography>
          </Grid>

          <Grid container>
            <Typography variant="h5" color="primary.main" fontWeight={700}>
              other option:&nbsp;
            </Typography>
            <Typography variant="h5" color="primary.main">
              {(!!poll.anotherOption).toString()}
            </Typography>
          </Grid>

          <Grid container>
            <Typography color="primary.main" fontWeight={700} variant="h5">
              published:&nbsp;
            </Typography>
            <Typography color="primary.main" variant="h5">
              {(!!poll.anotherOption).toString()}
            </Typography>
          </Grid>

          <Typography color="primary.main" fontWeight={700} variant="h5">
            answers:&nbsp;
          </Typography>
          <div>
            {poll.answers?.map((answer, idx) => (
              <Typography color="primary.main" variant="h5">
                {idx + 1}
                .
                {' '}
                {answer.content}
              </Typography>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

export default withAuth(PollDetail);
