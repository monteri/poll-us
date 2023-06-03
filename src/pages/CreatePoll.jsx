import { v4 as uuid } from 'uuid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import QueueIcon from '@mui/icons-material/Queue';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { withAuth } from '../helpers/autoNavigation';
import errorObserver from '../helpers/observers/ErrorObserver';
import { PollModel } from '../helpers/models';
import { useGlobalStore, usePollStore } from '../store';

function CreatePoll() {
  const navigate = useNavigate();
  const showAlert = useGlobalStore(state => state.showAlert);
  const createPoll = usePollStore(state => state.createPoll);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    type: '',
    anotherOption: false,
    answers: [],
  });

  useEffect(() => {
    errorObserver.registerRefresh(setErrors);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formModel = new PollModel(form);
    const hasErrors = formModel.createPollValidate();
    if (hasErrors) {
      return;
    }
    const [isSuccess, error] = await createPoll(formModel.data);
    if (isSuccess) {
      showAlert('success', 'Poll created successfully.');
      navigate('/dashboard');
    } else {
      setErrors({ common: error });
    }
  };

  const handleDeleteAnswer = (idx) => {
    setForm({ ...form, answers: form.answers.filter((_, i) => i !== idx) });
  };

  const handleUpdateAnswer = (e, idx) => {
    setForm({
      ...form,
      answers: form.answers.map(
        (answer, i) => (idx === i ? { id: answer.id, value: e.target.value } : answer),
      ),
    });
  };

  const handleAddAnswer = () => setForm({ ...form, answers: [...form.answers, { id: uuid(), value: '' }] });

  return (
    <Container maxWidth="xs" className="pollus__polls-container" sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <QueueIcon />
        </Avatar>
        <Typography variant="h5">
          Create poll
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                error={!!errors.title}
                helperText={errors.title}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="type-label"
                  id="type"
                  label="Type"
                  name="type"
                  value={form.type}
                  error={!!errors.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="multiple">Multiple</MenuItem>
                </Select>
                {errors.type && (<FormHelperText error>{errors.type}</FormHelperText>)}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Checkbox
                    name="anotherOption"
                    value={form.anotherOption}
                    color="primary"
                    onChange={() => setForm({ ...form, anotherOption: !form.anotherOption })}
                  />
                )}
                label="Add another option"
              />
            </Grid>
            <Grid item xs={12} className="pollus__answers-block">
              <Typography variant="h5">
                Answers
              </Typography>
              <IconButton onClick={handleAddAnswer}>
                <AddBoxIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              {form.answers.length ? form.answers.map((answer, idx) => (
                <Grid item className="pollus__answers-block" mt={1} key={answer.id}>
                  <Grid item xs={11}>
                    <TextField
                      required
                      fullWidth
                      value={form.answers[idx].value}
                      onChange={(e) => handleUpdateAnswer(e, idx)}
                      placeholder={`Answer ${idx + 1}`}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => handleDeleteAnswer(idx)}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )) : <Typography>No answers yet</Typography>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
          {errors.common && (
            <FormHelperText error>{errors.common}</FormHelperText>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default withAuth(CreatePoll);
