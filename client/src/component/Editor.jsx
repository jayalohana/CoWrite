import React, { useEffect, useRef, useState } from "react";
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
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
  
    useEffect(() => {
      const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions }});
      setQuill(quillServer);
  }, []);

  useEffect(() => {
    const socketServer = io('http://localhost:9000');
    setSocket(socketServer);

    socketServer.on('connect', () => {
        console.log('Connected to server');
    });

    socketServer.on('connect_error', (error) => {
        console.error('Connection error:', error);
    });

    return () => {
        socketServer.disconnect();
    }
}, []);


  useEffect(() => { 
    if(socket == null  || quill == null) return;

    const handleChange = (delta, oldData, source) => {
      if (source !== 'user') return;
      console.log('Emitting changes', delta); // This should log whenever a change is made by the user
      socket.emit('send-changes', delta);
  };

    quill && quill.on('text-change', handleChange);

      return() => {
       quill && quill.off('text-change', handleChange);
      }
    }, [quill, socket])


    return (
      <Component>
        <Box className='container' id="container" />
      </Component>
    );
  };
  

export default Editor;