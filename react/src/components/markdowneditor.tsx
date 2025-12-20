import { useState, useMemo } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "../css/markdown.css";

export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");

  const options = useMemo(() => ({
    spellChecker: false,
    autofocus: true,
    placeholder: "",
    lineNumbers: true,
  }), []);

  return (
    <SimpleMde
      id="simple-mde"
      value={markdownValue}
      onChange={setMarkdownValue}
      options={options}
    />
  );
};

export default MarkdownEditor;