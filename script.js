document.getElementById('compressImageByButton').addEventListener('click', function () {
    const fileInput = document.getElementById('upload');
    const widthInput = document.getElementById('width').value;
    const heightInput = document.getElementById('height').value;
    const compressionInput = document.getElementById('compression').value;

    if (fileInput.files.length === 0) {
        alert("Please upload an image!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            const canvas = document.getElementById('hideImage');
            const ctx = canvas.getContext('2d');

            // Get width and height
            const newWidth = widthInput || img.width;
            const newHeight = heightInput || img.height;

            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw image to canvas
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Compress the image
            const compressionLevel = compressionInput / 100;
            const compressedImageDataURL = canvas.toDataURL('CompressImage/jpeg', compressionLevel);

            // Display compressed image
            document.getElementById('CompressImage').src = compressedImageDataURL;

            // Create download link for compressed image
            const downloadLink = document.getElementById('download');
            downloadLink.href = compressedImageDataURL;
            downloadLink.style.display = 'inline-block'; // Show the download link
        };
    };

    reader.readAsDataURL(file);
});