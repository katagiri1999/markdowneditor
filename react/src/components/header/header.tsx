import { AppBar, Toolbar, Typography } from '@mui/material';

import userStore from '../../store/user_store';
import Sidebar from '../side_bar/sidebar';

import Profile from './profile';

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
          cloudjex.com
        </Typography>

        {id_token &&
          <Profile />
        }

      </Toolbar>
    </AppBar>
  );

}

export default Header;