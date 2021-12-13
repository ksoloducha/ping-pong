import "./Game.css";
import React, {useEffect, useState} from "react";
import { useRef } from "react";
import {CreateBorder, CreatePlayer, CreateBall, DrawDottedLine} from './DrawBoardElements'

const canvasWidth = 1200;
const canvasHeight = 700;
const playerWidth = 15;
const playerHeight = 150;
const playerOneX = 40;
const playerTwoX = canvasWidth - 40 - playerWidth;
let playerOneY = 280;
let playerTwoY = 280;
const radius = 15;
let ballX = (playerOneX + radius + playerWidth) + Math.random() * (canvasWidth - 2 * (playerOneX + radius + playerWidth));
let ballY = radius + Math.random() * (canvasHeight - 2 * radius);
let vX =  2 * Math.random() + 2;
let vY =  Math.random() + 1;

const Board = (props) => {

    function initBallCoordinates(){
        ballX = 5 + (playerOneX + radius + playerWidth) + Math.random() * (canvasWidth - 5 - 2 * (playerOneX + radius + playerWidth));
        ballY = 5 + radius + Math.random() * (canvasHeight - 5 - 2 * radius);
        let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        vX = (2 * Math.random() + 2) * plusOrMinus;
        plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        vY = (Math.random() + 1) * plusOrMinus;
    }

    let ref = useRef();

    useEffect(() => {
        let canvas = ref.current;
        let context = canvas.getContext("2d");

        CreateBorder(canvas, context)
        CreatePlayer(context, playerOneX, playerOneY, playerWidth, playerHeight)
        CreatePlayer(context, playerTwoX, playerTwoY, playerWidth, playerHeight)
    })

    function movePlayerTwoUp() {
        if(playerTwoY > 2){
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            context.clearRect(playerTwoX, playerTwoY, playerWidth, playerHeight)
            
            playerTwoY -= 1;
            
            CreatePlayer(context, playerTwoX, playerTwoY, playerWidth, playerHeight)
            requestAnimationFrame(movePlayerTwoUp);
        }
    }

    function movePlayerTwoDown() {
        if(playerTwoY + playerHeight < canvasHeight - 2){
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            context.clearRect(playerTwoX, playerTwoY, playerWidth, playerHeight)
            
            playerTwoY += 1;
            
            CreatePlayer(context, playerTwoX, playerTwoY, playerWidth, playerHeight)
            requestAnimationFrame(movePlayerTwoDown);
        }
    }

    function movePlayerOneUp() {
        if(playerOneY > 2){
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            context.clearRect(playerOneX, playerOneY, playerWidth, playerHeight)
            
            playerOneY -= 1;
            
            CreatePlayer(context, playerOneX, playerOneY, playerWidth, playerHeight)
            requestAnimationFrame(movePlayerOneUp);
        }
    }

    function movePlayerOneDown() {
        if(playerOneY + playerHeight < canvasHeight - 2){
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            context.clearRect(playerOneX, playerOneY, playerWidth, playerHeight)
            
            playerOneY += 1;
            
            CreatePlayer(context, playerOneX, playerOneY, playerWidth, playerHeight)
            requestAnimationFrame(movePlayerOneDown);
        }
    }   

    const [gamePaused, setGamePaused] = useState(props.gamePaused)
    let theInterval = useRef(-1);

    useEffect( () => {
        
        function defineBallVX(){
            if((ballX - radius - 5 < playerOneX + playerWidth && ballY - radius >= playerOneY && ballY + radius <= playerOneY + playerHeight)
                || (ballX + radius + 5 > playerTwoX && ballY - radius >= playerTwoY && ballY + radius <= playerTwoY + playerHeight)){
                vX *= -1
            } else if(ballX - radius - 5 < playerOneX + playerWidth){
                props.addPointForPlayerTwo()
                initBallCoordinates()
            } else if(ballX + radius + 5 > playerTwoX){
                props.addPointForPlayerOne()
                initBallCoordinates()
            }
        }
    
        function defineBallVY(){
            if(ballY - radius - 5 < 0 || ballY + radius + 5 > canvasHeight){
                vY *= -1;
            }
        } 

        function drawBall(){
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");

            context.save();
            context.globalCompositeOperation = 'destination-out';
            context.beginPath();
            CreateBall(context, ballX, ballY, radius + 1);
            context.fill();
            context.restore();
            
            context.globalCompositeOperation='source-over';            

                defineBallVX();
                defineBallVY();
                ballX += vX;
                ballY += vY;

            CreateBall(context, ballX, ballY, radius);
            DrawDottedLine(context, canvas) 
            
        }

            if(!gamePaused){
                theInterval.current = setInterval(drawBall, 10)
            } else{
                clearInterval(theInterval.current)
                var canvas = document.getElementById("canvas");
                var context = canvas.getContext("2d");
                initBallCoordinates();
                CreateBall(context, ballX, ballY, radius);
            }
       
        setGamePaused(props.gamePaused)
    }, [props.gamePaused])

    const HandleKeyPressed = (e) => {
        switch(e.key){
            case 'ArrowUp':
                movePlayerTwoUp()
                break;
            case 'ArrowDown':
                movePlayerTwoDown()
                break;
            case 'w':
                movePlayerOneUp();
                break;
            case 's':
                movePlayerOneDown();
                break;
            default:
                break;
        }
    }

    return (
        <canvas 
            id="canvas"
            ref={ref} 
            className="border"
            tabIndex={0}
            onKeyDown={HandleKeyPressed}
        />
    );
}

export default Board