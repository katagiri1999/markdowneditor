import Box from "@mui/material/Box";
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "../css/editor.css";

import Breadcrumb from "../components/breadcrumbs";
import EditorHeader from "../components/editor_header";
import userStore from '../store/user_store';
import utils from "../utils/utils";

import Loading from './loading';


export const Editor = () => {
  const location = useLocation();
  const { id_token } = userStore();
  const [isLoading, setLoading] = useState(false);
  const [markdownValue, setMarkdownValue] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const url_node_id = searchParams.get('node_id');

  useEffect(() => {
    const fetchNode = async () => {
      setLoading(true);

      const res = await utils.requests(
        `${import.meta.env.VITE_API_HOST}/nodes`,
        "GET",
        { authorization: `Bearer ${id_token}` },
        { node_id: url_node_id }
      );

      const body = res.body as { node: { text: string } };
      let text = "";
      if (res.status == 200) {
        text = body.node.text;
      };
      setMarkdownValue(text);

      setLoading(false);
    };

    fetchNode();
  }, [url_node_id, id_token]);

  const options = useMemo(() => ({
    spellChecker: false,
    autofocus: true,
    placeholder: "",
    lineNumbers: true,
  }), []);

  return (
    <>
      <Loading loading={isLoading} />

      <Box display="flex" justifyContent="space-between">
        <Breadcrumb />
        <EditorHeader markdownValue={markdownValue} />
      </Box>

      <SimpleMde
        id="simple-mde"
        value={markdownValue}
        onChange={setMarkdownValue}
        options={options}
      />
    </>
  );
};

export default Editor;