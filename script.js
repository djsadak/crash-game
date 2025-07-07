const canvas = document.getElementById("crashChart");
const ctx = canvas.getContext("2d");
const multiplierDisplay = document.getElementById("crashMultiplier");

let x = 0;
let y = canvas.height;
let multiplier = 1.0;
let crashed = false;

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = 0;
    y = canvas.height;
    multiplier = 1.0;
    crashed = false;
    multiplierDisplay.textContent = "1.00x";
    requestAnimationFrame(drawCrashLine);
}

function drawCrashLine() {
    if (crashed) return;

    multiplier += 0.01 + multiplier * 0.01;
    multiplierDisplay.textContent = `${multiplier.toFixed(2)}x`;

    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);

    x += 2;
    y = canvas.height - multiplier * 10;

    if (x > canvas.width || y < 0 || Math.random() < 0.005 * multiplier) {
        crashed = true;
        multiplierDisplay.textContent += " 💥";
        return;
    }

    ctx.lineTo(x, y);
    ctx.stroke();

    requestAnimationFrame(drawCrashLine);
}

reset();
