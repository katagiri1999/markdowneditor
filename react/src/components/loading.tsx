import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import loadingState from '../store/loading_store';

function Loading() {
  const { loading } = loadingState();

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
