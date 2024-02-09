import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import styled from '@emotion/styled';
import { io } from 'socket.io-client';

const Component = styled.div`
background: #ffe5ec;
`

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const Editor = () => {
    const quillRef = useRef(null);
    useEffect(() => {
      if (quillRef.current && !quillRef.current.quill) {
        const quill = new Quill(quillRef.current, {
          theme: "snow",
          modules: { toolbar: toolbarOptions },
        });
        quillRef.current.quill = quill; 
      }
    }, []);


useEffect(() => {
   const socket =  io('http://localhost:9000');

   return () => {
    socket.disconnect(); 
   }
})  

    return (
      <Component>
        <Box className='container' ref={quillRef} />
      </Component>
    );
  };

export default Editor;
