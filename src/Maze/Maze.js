import React, { useState, useEffect } from "react";

import Cell from "./Cell";
import { useRef } from "react";
import Logo from "../logo.svg";
import Start from "../images/start.png";
import Facebook from "../images/facebook.png";
import Linkdin from "../images/linkdin.png";
import GitHub from "../images/github.png";
import Instagram from "../images/instagram.png";
const Maze = () => {
  // Maze Settings
  const num_rows = 20;
  const num_cols = 20;
  const num_images = 5;

  const [images] = useState([Start, Facebook, Linkdin, GitHub, Instagram]);
  const [url] = useState([
    null,
    "https://www.facebook.com/PDSH123/",
    "https://www.linkedin.com/in/pedroduartesh/",
    "https://github.com/pedroDuarteSH/",
    "https://www.instagram.com/pedro_._duarte/",
  ]);
  //States for dimensions
  const [maze_width] = useState(700);
  const [maze_height] = useState(700);
  //State for pos
  const [elementsPos] = useState(Array(num_images).fill(null));
  const [clear, setClear] = useState(false);

  //last.x variable
  var last = { x: 0, y: 0 };

  //State for cell
  const [cellWidth, setCellWidth] = useState(maze_width / num_cols);
  const [cellHeight, setCellHeight] = useState(maze_height / num_rows);

  //State for canvas
  const canvasRef = useRef(null);

  //State for maze and its limits
  const [limits, setLimits] = useState(null);
  const [maze] = useState(
    Array(num_rows)
      .fill(null)
      .map((_, i) =>
        Array(num_cols)
          .fill(null)
          .map((_, j) => new Cell(i, j))
      )
  );

  // Set maze and limits to correct state
  useEffect(() => {
    function randomDirections() {
      var list_of_directions = [];
      while (true) {
        var dir = Math.floor(Math.random() * 4);
        if (!list_of_directions.includes(dir)) {
          list_of_directions.push(dir);
        }
        if (list_of_directions.length === 4) {
          break;
        }
      }
      return list_of_directions;
    }

    function randomizedDFS(x, y) {
      var list = randomDirections();
      list.forEach((element) => {
        var next_x = x;
        var next_y = y;
        switch (element) {
          case 0:
            next_x -= 1;
            if (next_x >= 0) {
              if (maze[next_x][next_y].visited === false) {
                maze[next_x][next_y].visited = true;
                maze[x][y].border.top = 0;
                maze[next_x][next_y].border.bottom = 0;
                randomizedDFS(next_x, next_y);
              }
            }
            break;
          case 1:
            next_x += 1;
            if (next_x < num_cols) {
              if (maze[next_x][next_y].visited === false) {
                maze[next_x][next_y].visited = true;
                maze[x][y].border.bottom = 0;
                maze[next_x][next_y].border.top = 0;
                randomizedDFS(next_x, next_y);
              }
            }
            break;
          case 2:
            next_y -= 1;
            if (next_y >= 0) {
              if (maze[next_x][next_y].visited === false) {
                maze[next_x][next_y].visited = true;
                maze[x][y].border.left = 0;
                maze[next_x][next_y].border.right = 0;
                randomizedDFS(next_x, next_y);
              }
            }
            break;
          case 3:
            next_y += 1;
            if (next_y < num_rows) {
              if (maze[next_x][next_y].visited === false) {
                maze[next_x][next_y].visited = true;
                maze[x][y].border.right = 0;
                maze[next_x][next_y].border.left = 0;
                randomizedDFS(next_x, next_y);
              }
            }
            break;
          default:
            break;
        }
      });
    }
    randomizedDFS(Math.floor(num_rows / 2), 0);
    var limits = Array(num_rows)
      .fill(null)
      .map((_, i) => Array(num_cols).fill(null));

    maze.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        limits[rowIndex][colIndex] = {
          top: cell.border.top,
          bottom: cell.border.bottom,
          left: cell.border.left,
          right: cell.border.right,
        };
      });
    });

    setLimits(limits);
  }, [maze]);

  // Set elements positions
  useEffect(() => {
    var i = 0;
    while (i < num_images) {
      var x = Math.floor(Math.random() * num_cols);
      var y = Math.floor(Math.random() * num_rows);
      if (!elementsPos.includes({ x: x, y: y })) {
        elementsPos[i] = { x: x, y: y };
      }
      i++;
    }
  }, [elementsPos]);

  // Draw inside canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let touch_start = false;
    let touch_end = false;
    // Set drawing properties (color, line width, etc.) here
    context.strokeStyle = "black";
    context.lineWidth = 2;

    let isDrawing = false;
    let start_begin = false;


    function getX(event) {
      if (
        event.type === "mousedown" ||
        event.type === "mousemove" ||
        event.type === "mouseup"
      ) {
        return event.clientX - canvas.offsetLeft;
      }
      if(
        event.type === "touchstart" ||
        event.type === "touchmove"
      ){
        return event.touches[0].clientX - canvas.offsetLeft;
      }

      return event.changedTouches[0].clientX - canvas.offsetLeft;
    }

    function getY(event) {
      if (
        event.type === "mousedown" ||
        event.type === "mousemove" ||
        event.type === "mouseup"
      ) {
        return event.clientY - canvas.offsetTop;
      }

      if(
        event.type === "touchstart" ||
        event.type === "touchmove"
      ){
        return event.touches[0].clientY - canvas.offsetTop;
      }

      return event.changedTouches[0].clientY - canvas.offsetTop;
    }

    function setLastFunction(x, y) {
      last.x = x;
      last.y = y;
    }

    function line(x, y) {
      context.lineTo(x, y);
      context.stroke();
    }

    function startDrawing(event) {
      isDrawing = true;

      var x_coord = Math.floor(getX(event) / cellWidth);
      var y_coord = Math.floor(getY(event) / cellHeight);

      if (x_coord === elementsPos[0].x && y_coord === elementsPos[0].y) {
        start_begin = true;
      }
      if (!start_begin) {
        return;
      }
      setLastFunction(elementsPos[0].x, elementsPos[0].y);
      context.beginPath();
      context.moveTo(getX(event), getY(event));
    }

    function draw(event) {
      if (!isDrawing) return;
      var x_coord = getX(event);
      var y_coord = getY(event);
      var x = Math.floor(x_coord / cellWidth);
      var y = Math.floor(y_coord / cellHeight);
      if (x < 0 || x >= num_cols || y < 0 || y >= num_rows) {
        return;
      }

      if (x === last.x && y === last.y) {
        context.lineTo(x_coord, y_coord);
        context.stroke();
        return;
      }
      console.log(x, y);  

      var dif_x = last.x - x;
      var dif_y = last.y - y;

      if (
        Math.abs(dif_x) > 1 ||
        Math.abs(dif_y) > 1 ||
        Math.abs(dif_x) + Math.abs(dif_y) > 1
      ) {
        return;
      }

      if (dif_x === 1) {
        if (limits[last.y][last.x].left === 0) {
          line(x_coord, y_coord);
          setLastFunction(x, y);
          return;
        }
      } else if (dif_x === -1) {
        if (limits[last.y][last.x].right === 0) {
          line(x_coord, y_coord);
          setLastFunction(x, y);
          return;
        }
      } else if (dif_y === 1) {
        if (limits[last.y][last.x].top === 0) {
          line(x_coord, y_coord);
          setLastFunction(x, y);
          return;
        }
      } else if (dif_y === -1) {
        if (limits[last.y][last.x].bottom === 0) {
          line(x_coord, y_coord);
          setLastFunction(x, y);
          return;
        }
      }
    }

    function stopDrawing(event) {
      isDrawing = false;
      if (!start_begin) {
        return;
      }
      context.lineTo(getX(event), getY(event));
      var x = getX(event);
      var y = getY(event);

      console.log(x, y);
      console.log(elementsPos);
      var x_coord = Math.floor(x / cellWidth);
      var y_coord = Math.floor(y / cellHeight);
      console.log(x_coord, y_coord);
      elementsPos.forEach((element, index) => {
        if (index !== 0) {
          if (element.x === x_coord && element.y === y_coord) {
            console.log("open");
            console.log(url[index]);
            window.open(url[index], "_blank", "noreferrer");
          }
        }
      });
      start_begin = false;
      context.closePath();
      console.log("stop");
      setClear(true);
      console.log("stop");
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);

    canvas.addEventListener("touchstart", (event) => {
      
      if(!isDrawing){
        startDrawing(event)
      }}
    );

    canvas.addEventListener("touchmove", (event) => {
    
          draw(event)
      
    }
    );

    canvas.addEventListener("touchend", (event) => {
      if(isDrawing){
        isDrawing = false;
        stopDrawing(event);

      }
      
    }
    );


    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);

      canvas.removeEventListener("touchstart",  (event) => {
        console.log(event)
        
        startDrawing(event)
      }
      );

      canvas.removeEventListener("touchmove",  (event) => {
        
        console.log(event)
        if(event.touches.lenght > 0){
            draw(event)
        }
      }
      );

      canvas.removeEventListener("touchend", (event) => {
        if(isDrawing){
          isDrawing = false;
          stopDrawing(event);
  
        }}
      );

    };
  }, [maze, cellWidth, cellHeight, maze_height, elementsPos, limits, clear]);

  useEffect(() => {
    if (maze_width === null || maze_height === null) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    setCellWidth(Math.floor(maze_width / num_cols));
    setCellHeight(Math.floor(maze_height / num_rows));

    // Set drawing properties (color, line width, etc.) here
    context.strokeStyle = "black"; // You can customize the stroke color
    context.lineWidth = 2; // You can customize the line width
    setClear(true);
  }, [maze, maze_height, maze_width, cellWidth, cellHeight]);

  useEffect(() => {
    console.log(clear)
    if (clear) {
      
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.clearRect(0, 0, maze_width, maze_height);
      for (let index = 0; index < num_images; index++) {
        const element = elementsPos[index];
        context.beginPath();
        const x = element.x * cellWidth + 2;
        const y = element.y * cellHeight + 2;
        const img = new Image();
        img.src = images[index];

        img.onload = function () {
          context.drawImage(img, x, y, cellWidth - 4, cellHeight - 4);
        };
        context.closePath();
      }

      maze.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const x = colIndex * cellWidth;
          const y = rowIndex * cellHeight;

          context.beginPath();

          if (cell.border.top) {
            context.moveTo(x, y);
            context.lineTo(x + cellWidth, y);
          }

          if (cell.border.right) {
            context.moveTo(x + cellWidth, y);
            context.lineTo(x + cellWidth, y + cellHeight);
          }

          if (cell.border.bottom) {
            context.moveTo(x, y + cellHeight);
            context.lineTo(x + cellWidth, y + cellHeight);
          }

          if (cell.border.left) {
            context.moveTo(x, y);
            context.lineTo(x, y + cellHeight);
          }

          context.stroke();
          context.closePath();
        });
      });

      setClear(false);
    }
  }, [clear]);

  return (
    <div>
      <canvas ref={canvasRef} width={maze_width} height={maze_height} />
    </div>
  );
};

export default Maze;
