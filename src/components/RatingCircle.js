import React, { useCallback } from "react";
import Color from "color";

const RatingCircle = ({
    width,
    value,
    color = "#32a852",
    id,
    className
}) => {
    const draw = useCallback(
        canvas => {
            if(!canvas) return;
            const diameter = width;
            const radius = diameter / 2;
            const pixelRatio = window.devicePixelRatio;
            canvas.width = pixelRatio * diameter;
            canvas.height = pixelRatio * diameter;
            canvas.style.width = diameter + "px";
            canvas.style.height = diameter + "px";
            
            const context = canvas.getContext("2d");
            context.scale(pixelRatio, pixelRatio);
            let loaded = 0;


            const cx = radius; 
            const cy = radius;
            let angle = 0;
            const barColor = Color(color);
            const barWidth = 6;
            const animate = () => {
                angle = (loaded / 100) * Math.PI * 2;
                context.clearRect(0, 0, diameter, diameter);
                //draw bg circle
                context.beginPath();
                context.arc(cx, cy, radius, 0, 2 * Math.PI, false);
                context.fillStyle = "#000"; 
                context.fill();
                //draw shaded placeholder
                context.beginPath();
                context.arc(cx, cy, radius - 5, 0, 2 * Math.PI, false);
                context.strokeStyle = barColor.darken(0.6).hex();
                context.lineWidth = barWidth;
                context.stroke();
                //draw bar
                context.beginPath();
                
                // The arc top with ccw corresponds to angle 270 deg
                const start = (Math.PI * 3) / 2;
                context.arc(cx, cy, radius - barWidth, start, angle + start, false);
                context.strokeStyle = barColor.hex();
                context.lineWidth = barWidth;
                context.lineCap = "round";
                context.stroke();
                //text indicator
                const fontSize = radius / 2.5;
                context.font = `${fontSize}px Segoe UI`; 
                context.fillStyle = "#fff";
                context.textBaseline = "middle";
                context.textAlign = "center";
                context.fillText(loaded + "%", cx - 1, cy + 1);
                if (loaded < value) window.requestAnimationFrame(animate);

                loaded++;
            };
            window.requestAnimationFrame(animate);
        },[value,width,color]
    );
    return(
        <div id={id} className={className} style={{ width, height: width }}>
        <canvas ref={draw} id="rating-circle-canvas" />
      </div>
    );
};
export default RatingCircle;