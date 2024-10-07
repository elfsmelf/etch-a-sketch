const gridContainerElement = document.querySelector(".grid-container");
const sliderElement = document.querySelector(".slider");
const sliderValueElement = document.querySelector(".slider-value");
const sliderValueElement2 = document.querySelector(".slider-value2");

const resetButtonElement = document.querySelector(".reset-button");

sliderValueElement.textContent = "16";
sliderValueElement2.textContent = "16";

sliderElement.oninput = function () {
  sliderValueElement.textContent = this.value;
  sliderValueElement2.textContent = this.value;
  createGridSquares(Number(this.value));
};

let isMouseDown = false;
let isInsideGrid = false;

const checkbox = document.getElementById("rainbow-checkbox");

let isRainbow = false;

// Modify the event listener for the checkbox
checkbox.addEventListener("change", function () {
  isRainbow = this.checked;
  console.log("Rainbow mode:", isRainbow); // Log the current state when it changes
});

//reset button

resetButtonElement.addEventListener("click", refreshPage);

function refreshPage() {
  location.reload();
}

function createGridSquares(columns) {
  const numberOfDivs = columns ** 2;

  gridContainerElement.innerHTML = "";

  const itemSize = 100 / columns;

  for (let i = 0; i < numberOfDivs; i++) {
    const gridItemElement = document.createElement("div");
    gridItemElement.classList.add("grid-item");
    gridItemElement.style.flex = `0 0 calc(${itemSize}%)`;
    gridContainerElement.appendChild(gridItemElement);
  }

  // Move event listeners outside the loop
  gridContainerElement.addEventListener("mousedown", startDrawing);
  gridContainerElement.addEventListener("mouseup", stopDrawing);
  gridContainerElement.addEventListener("mouseenter", () => {
    isInsideGrid = true;
  });
  gridContainerElement.addEventListener("mouseleave", () => {
    isInsideGrid = false;
    stopDrawing();
  });
  gridContainerElement.addEventListener("mouseover", draw);
}

function startDrawing(event) {
  isMouseDown = true;
  draw(event); // Unified drawing function
}

function stopDrawing() {
  isMouseDown = false;
}

function draw(event) {
  if (isMouseDown && event.target.classList.contains("grid-item")) {
    if (isRainbow) {
      let drawingColour = Math.floor(Math.random() * 16777215).toString(16);
      event.target.style.backgroundColor = "#" + drawingColour;
    } else {
      event.target.style.backgroundColor = "#1f2937";
    }
  }
}

// Initial grid creation (you can set the default size)
createGridSquares(16);
