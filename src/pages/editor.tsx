import * as React from 'react'
import styled from "styled-components"
import { useRef, useState } from 'react'
import jsPDF from 'jspdf'
import  ReactMarkdown from 'react-markdown'
import { useStateWithStorage } from '../hooks/useStateWithStorage'
import html2canvas from 'html2canvas';


const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 2rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`

export const Editor: React.FC = () => {
    const StorageKey = 'pages/editor:text'
    const [text,setText] = useStateWithStorage('',StorageKey);
    const ref = useRef();
    const _exportPdf = () => {
      if(!document.getElementById("capture")) return
      html2canvas(document.getElementById("capture")).then(canvas => {
         document.body.appendChild(canvas);  // if you want see your screenshot in body.
         const imgData = canvas.toDataURL('image/png');
         const pdf = new jsPDF();
         pdf.addImage(imgData, 'PNG', 0, 0);
         pdf.save("download.pdf"); 
     });
 
  }

  return (
    <>
      <Header>
        Markdown to PDF Editor
        <button style={{float: 'right'}} onClick={_exportPdf}>generate</button>
      </Header>
      <Wrapper>
        <TextArea 
        onChange={(e => setText(e.target.value)
            )}
        value={text}
         />
         <div >
          <Preview id="capture" >
              <ReactMarkdown children={text} />
          </Preview>
         </div>
      </Wrapper>
    </>
  )
}