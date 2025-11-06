// Select the "Fetch Space Images" button by its ID
const getImageBtn = document.getElementById('getImageBtn');

// Select the gallery container by its ID
const gallery = document.getElementById('gallery');

// NASA APOD API endpoint for random images
const API_URL = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

// Function to create and show the modal with image details
function showModal(item) {
  // Create the modal background
  const modalBg = document.createElement('div');
  modalBg.style.position = 'fixed';
  modalBg.style.top = 0;
  modalBg.style.left = 0;
  modalBg.style.width = '100vw';
  modalBg.style.height = '100vh';
  modalBg.style.background = 'rgba(0,0,0,0.7)';
  modalBg.style.display = 'flex';
  modalBg.style.alignItems = 'center';
  modalBg.style.justifyContent = 'center';
  modalBg.style.zIndex = 1000;

  // Create the modal content
  const modalContent = document.createElement('div');
  modalContent.style.background = '#fff';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '8px';
  modalContent.style.maxWidth = '600px';
  modalContent.style.width = '90%';
  modalContent.style.position = 'relative';

  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '10px';
  closeBtn.style.right = '10px';
  closeBtn.style.background = '#d3d3d3';
  closeBtn.style.border = 'none';
  closeBtn.style.padding = '8px 12px';
  closeBtn.style.borderRadius = '4px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modalBg);
  });

  // Add image and details
  modalContent.innerHTML = `
    <h2>${item.title}</h2>
    <img src="${item.url}" alt="${item.title}" style="width:100%;max-height:300px;object-fit:contain;border-radius:4px;" />
    <p><strong>Date:</strong> ${item.date}</p>
    <p>${item.explanation}</p>
  `;
  modalContent.appendChild(closeBtn);
  modalBg.appendChild(modalContent);

  // Close modal on background click
  modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) {
      document.body.removeChild(modalBg);
    }
  });

  document.body.appendChild(modalBg);
}

// Function to render the images in the gallery
function renderGallery(items) {
  // Clear the gallery
  gallery.innerHTML = '';
  // Loop through each item and create a gallery card
  items.forEach(item => {
    // Only show images (not videos)
    if (item.media_type === 'image') {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.innerHTML = `
        <img src="${item.url}" alt="${item.title}" />
        <p><strong>${item.title}</strong></p>
        <p>${item.date}</p>
      `;
      // Show modal with details when clicked
      div.addEventListener('click', () => showModal(item));
      gallery.appendChild(div);
    }
  });
}

// Add a click event listener to the button
getImageBtn.addEventListener('click', () => {
  // Show loading message before fetching data
  gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">🚀</div>
      <p>Loading Space Images...</p>
    </div>
  `;

  // Fetch random images from the NASA APOD API
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      // Log the full API response to the console
      console.log('NASA APOD API response:', data);
      // Render the images in the gallery
      renderGallery(data);
    })
    .catch(error => {
      // Show an error message if something goes wrong
      gallery.innerHTML = `<div class="placeholder"><p>Failed to fetch images. Please try again later.</p></div>`;
      console.error('Error fetching NASA APOD images:', error);
    });
});


