import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import userStore from '../store/user_store.jsx';

import Profile from './profile.jsx';
import Sidebar from './sidebar.jsx';

function Header() {
  const { id_token } = userStore();

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex" }}>

        {id_token &&
          <Sidebar />
        }

        <Typography
          variant="h6"
        >
          Cork-Up
        </Typography>

        <Profile />

      </Toolbar>
    </AppBar>
  );

}

export default Header;