import React, { useRef } from 'react'
import Editor from '@monaco-editor/react'
import { useAppContext } from '../../../admin-panel/Context'

export default function functions () {
  const { width, height, ref } = useAppContext()

  const editorRef = useRef(null)

  function handleEditorDidMount (editor, monaco) {
    editorRef.current = editor
  }

  function showValue () {
    alert(editorRef.current.getValue())
  }

  return (
    <Editor
      height={height}
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onMount={handleEditorDidMount}
    />
  )
}
