const generatorDiv = document.querySelector(".generator");
const generatorBtn = generatorDiv.querySelector(".generator-form button");
const qrInput = generatorDiv.querySelector(".generator-form input");
const qrImg = generatorDiv.querySelector(".generator-img img");
const downloadBtn = generatorDiv.querySelector(".generator-btn .btn-link");

let imgURL = '';

generatorBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue) return;

    generatorBtn.innerText = "Generating QR Code...";

    imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;

    qrImg.addEventListener("load", () => {
        generatorDiv.classList.add("active");
        generatorBtn.innerText = "Generate QR Code";
    }, { once: true });  // Ensures the event listener is removed after it fires once

    qrImg.src = imgURL;
});

// Download button event
downloadBtn.addEventListener("click", () => {
    if (!imgURL) return;
    fetchImage(imgURL);
});

function fetchImage(url) {
    fetch(url)
        .then(res => res.blob())
        .then(file => {
            let tempFile = URL.createObjectURL(file);
            let fileName = url.split("=")[1]; // Extracting QR data as filename
            let extension = file.type.split("/")[1] || "png"; // Default to "png" if unknown
            download(tempFile, fileName, extension);
        })
        .catch(() => {
            imgURL = '';
            alert("Failed to download the QR code.");
        });
}

function download(tempFile, fileName, extension) {
    let a = document.createElement("a");
    a.href = tempFile;
    a.download = `${fileName}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

qrInput.addEventListener("input", () =>{
    if(!qrInput.value.trim())
        return generatorDiv.classList.remove("active");
})
