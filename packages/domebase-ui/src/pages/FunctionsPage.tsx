import Editor from "@monaco-editor/react";

export function FunctionsPage() {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
}
