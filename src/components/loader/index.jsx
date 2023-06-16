import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}
    >
      <CircularProgress size={20} sx={{ mr: '4px' }} />
      Waiting for server response...
    </div>
  );
}

export default Loader;
