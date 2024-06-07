var chosenFile;
var countdownElement = document.getElementById("countdown");
var countdownTime = 5; // in seconds
let imageSrc;
function displayImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('uploadButton').style.display = 'block'; // Display the upload button
      var image = document.getElementById('uploaded-image');
      image.src = e.target.result;
      image.style.display = 'block';
      document.querySelector('.upload-gif').style.display = 'none'; // Hide the upload GIF
      chosenFile = e.target.result; // Store the chosen file
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function validateAndDisplayImage(input) {
  var file = input.files[0];
  var extension = file.name.split('.').pop().toLowerCase();
  if (extension === 'jpg' || extension === 'jpeg'||extension==='png') {
    displayImage(input);
  } else {
    document.getElementById('invalid-extension-popup').style.display = 'block';
  }
}

function closeInvalidExtensionPopup() {
  document.getElementById('invalid-extension-popup').style.display = 'none';
}

function detected_image(image) {
  console.log(image);
var countdownElement = document.getElementById("countdown");
var countdownTime = 5;
  document.getElementById("upload-popup").style.display = "block"; // Display the upload popup
  var countdownInterval = setInterval(function() {
    countdownElement.textContent =  + countdownTime + " seconds";
    countdownTime--;
    // imageSrc=image
    if (countdownTime < 0) {
      clearInterval(countdownInterval);
      
      document.getElementById('upload-popup').style.display = 'none'; // Hide the popup
      document.getElementById("section-2").style.display = "block"; // Show section-2
      image = image.replace("user_interface/", "");
      document.getElementById("uploaded-image-section-2").src = image; // Display the chosen file in section-2
      // document.getElementById("uploaded-image-section-2").src = "/static/results/exp3/train_0.png"; // Display the chosen file in section-2
      document.getElementById("finish-button").style.display = "flex"; // Show the finish button
      window.location.href = "#section-2"; // Redirect to section-2
    }
  }, 1000);
}




function gotoSection1() {
  document.getElementById("section-2").style.display = "none"; // Hide section-2
  document.getElementById("finish-button").style.display = "none"; // Hide the finish button
  window.location.href = "#section-1"; // Redirect to section-1
}
function downloadImageWithNewName() {
  // Prompt the user for the new image name
  var newImageName = prompt("Enter the new image name:");
  
  // Get the existing image element
  var imageElement = document.getElementById("uploaded-image-section-2"); // Replace "your_image_id" with the ID of your image element
  
  if (newImageName && imageElement) {
      // Replace the existing image name with the new one
      imageElement.setAttribute("download", newImageName);
      
      // Initiate the download of the image
      var imageUrl = imageElement.src;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", imageUrl, true);
      xhr.responseType = "blob";
      xhr.onload = function() {
          var blob = new Blob([xhr.response], { type: "image/jpeg" }); // Adjust the type according to your image type
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = newImageName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
      };
      xhr.send();
  } else {
      alert("Please enter a valid image name.");
  }
}


