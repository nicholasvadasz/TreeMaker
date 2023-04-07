import React from "react";
import "./CmasTree.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CmasTree() {
  const { name } = useParams<{ name: string }>();
  const [initialFlush, setInitialFlush] = useState(false);
  const [input, setInput] = useState(name ? name : "");
  const [blinking, setBlinking] = useState(true);
  const [leavesOfTree, setLeavesOfTree] = useState([<div></div>]);
  const [renderLeaves, setRenderLeaves] = useState([<div></div>]);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    if (name && !initialFlush) {
      setInput(name);
      populateLeavesOfTree();
      setRendering(true);
      setInitialFlush(true);
    }
    if (rendering) {
      let i = 0;
      const interval = setInterval(() => {
        setRenderLeaves(leavesOfTree.slice(0, i));
        i++;
        if (i > leavesOfTree.length) {
          setRendering(false);
        }
      }, 100);
      return () => clearInterval(interval);
    }
    if (blinking && input) {
      console.log("blinking");
      const interval = setInterval(() => {
        twinkleOrnaments();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [name, blinking, rendering]);

  const populateLeavesOfTree = async () => {
    let lines = [];
    let myArray = [<div className="star">*</div>];
    const name = input;
    for (let i = -1; i < name.length; i++) {
      lines.push(name.slice(0, i + 1));
    }
    for (let i = 0; i < lines.length; i++) {
      let div = [];
      for (let j = 0; j < lines[i].length; j++) {
        if (Math.random() < 0.05) {
          div.push(<span className="red">{lines[i][j]}</span>);
        } else if (Math.random() < 0.1) {
          div.push(<span className="blue">{lines[i][j]}</span>);
        } else if (Math.random() < 0.15) {
          div.push(<span className="yellow">{lines[i][j]}</span>);
        } else {
          div.push(<span className="green">{lines[i][j]}</span>);
        }
      }
      myArray.push(<div className="branch">{div}</div>);
    }
    myArray.push(<div className="trunk">|||</div>);
    setLeavesOfTree(myArray);
  };

  const twinkleOrnaments = () => {
    let lines = [];
    let myArray = [<div className="star">*</div>];
    const name = input;
    for (let i = -1; i < name.length; i++) {
      lines.push(name.slice(0, i + 1));
    }
    for (let i = 0; i < lines.length; i++) {
      let div = [];
      for (let j = 0; j < lines[i].length; j++) {
        if (Math.random() < 0.05) {
          div.push(<span className="red">{lines[i][j]}</span>);
        } else if (Math.random() < 0.1) {
          div.push(<span className="blue">{lines[i][j]}</span>);
        } else if (Math.random() < 0.15) {
          div.push(<span className="yellow">{lines[i][j]}</span>);
        } else {
          div.push(<span className="green">{lines[i][j]}</span>);
        }
      }
      myArray.push(<div className="branch">{div}</div>);
    }
    myArray.push(<div className="trunk">|||</div>);
    setRenderLeaves(myArray);
  };

  const copyToClipboard = () => {
    let sanitizedInput = encodeURI(input);
    navigator.clipboard.writeText(
      window.location.origin + "/" + sanitizedInput
    );
  };

  return (
    <div className="CmasTree">
      <div className="TreeRender">
        {renderLeaves.map((leaf) => {
          return leaf;
        })}
      </div>
      <div className="InputFields">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="NameInput"
        />
        <button
          className="MakeTreeButton"
          title="Make Tree"
          onClick={() => {
            populateLeavesOfTree();
            setRendering(true);
          }}
        >
          🎄
        </button>
        <button
          className="MakeTreeButton"
          title="Copy Link"
          onClick={() => {
            copyToClipboard();
          }}
        >
          📤
        </button>
        <button
          className="MakeTreeButton"
          title="Twinkle Ornaments"
          onClick={() => {
            setBlinking(!blinking);
          }}
        >
          {blinking ? "🔦" : "🔅"}
        </button>
      </div>
    </div>
  );
}
