// Select scanner container
const scannerDiv = document.querySelector(".scanner");

// Select camera and stop camera buttons
const camera = scannerDiv.querySelector(".fa-camera");
const stopCam = scannerDiv.querySelector(".fa-circle-stop");

// Select form elements
const form = scannerDiv.querySelector(".scanner-form");
const fileInput = form.querySelector("input");
const p = form.querySelector("p");
const img = form.querySelector("img");
const video = scannerDiv.querySelector("video");
const content = form.querySelector(".content");

// Select scanner details elements
const textarea = scannerDiv.querySelector(".scanner-details textarea");
const copyBtn = scannerDiv.querySelector(".scanner-details .copy");
const closeBtn = scannerDiv.querySelector(".scanner-details .close");

// Trigger file input when form is clicked
form.addEventListener("click", () => fileInput.click());

// Listen for file input change
fileInput.addEventListener("change", (e) => {
    let file = e.target.files[0];
    if (!file) return;
    fetchRequest(file);
});

function fetchRequest(file) {
    let formData = new FormData();
    formData.append("file", file);  // Fixed append method

    p.innerText = "Scanning QR Code...";

    fetch(`https://api.qrserver.com/v1/read-qr-code/`, {
        method: "POST",
        body: formData,
    })
    .then((res) => res.json())
    .then((result) => {
        let text = result[0]?.symbol[0]?.data; // Added optional chaining to prevent errors

        if (!text) {
            p.innerText = "Couldn't scan QR code.";
            return;
        }

        // Show the scanner details
        scannerDiv.classList.add("active");
        form.classList.add("active-img");

        // Display the scanned image and text result
        img.src = URL.createObjectURL(file);
        textarea.innerText = text;
    })
    .catch(() => {
        p.innerText = "Error scanning QR code. Please try again.";
    });
}

// Copy to clipboard functionality
copyBtn.addEventListener("click", () => {
    textarea.select();
    document.execCommand("copy");
    alert("QR code text copied to clipboard!");
});

// Close scanner details
closeBtn.addEventListener("click", () => {
    scannerDiv.classList.remove("active");
    form.classList.remove("active-img");
    textarea.innerText = "";
});
