import { AppBar, Toolbar, Typography } from '@mui/material';

import type { Tree } from "@/src/lib/types";

import Profile from '@/src/components/header/profile';
import Sidebar from '@/src/components/side_bar/sidebar';
import userStore from '@/src/store/user_store';


function Header(props: { tree: Tree, node_id: string }) {
  const { id_token } = userStore();

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex" }}>

        {id_token &&
          <Sidebar tree={props.tree} node_id={props.node_id} />
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