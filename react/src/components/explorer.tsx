import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import userStore from "../store/user_store";
import utils from "../utils/utils";

import TreeUpdate from './tree_update';

function Explorer() {
  const navigate = useNavigate();
  const { id_token, tree } = userStore();
  const [expandedItems, setExpandedItems] = useState(["/Folder"]);

  const url_node_id = utils.get_url_node_id() || "/Folder";
  const parents = utils.get_parent_node_ids(url_node_id);
  const displayedExpanded = [...new Set([...expandedItems, ...parents])];

  const handleItemClick = (_: React.MouseEvent<Element, MouseEvent>, itemId: string) => {
    navigate(`/main?node_id=${itemId}`);
  };

  if (id_token && tree) {
    return (
      <>
        <Typography variant="h5" sx={{ my: 2 }}>
          Explorer
        </Typography>

        <Box>
          <RichTreeView
            items={[tree]}
            onItemClick={handleItemClick}
            selectedItems={url_node_id}
            expandedItems={displayedExpanded}
            onExpandedItemsChange={(_, ids) => setExpandedItems(ids)}
            slots={{
              expandIcon: FolderIcon,
              collapseIcon: FolderOpenIcon,
              endIcon: ArticleOutlinedIcon,
            }}
          />
          <TreeUpdate currentNodeId={url_node_id} />
        </Box>
      </>
    );
  }
};

export default Explorer;