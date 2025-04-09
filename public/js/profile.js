// Profile functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.profile-tab');
    const uploadBtn = document.querySelector('.upload-btn');
    const removeBtn = document.querySelector('.remove-btn');
    const saveBtn = document.querySelector('.save-btn');
    const profilePicture = document.querySelector('.profile-picture');
    
    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically show the corresponding tab content
            const tabType = this.getAttribute('data-tab');
            alert(`${tabType} tab content would be shown here`);
        });
    });
    
    // Upload profile picture
    uploadBtn.addEventListener('click', function() {
        // Create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        // Trigger click on file input
        fileInput.click();
        
        // Handle file selection
        fileInput.addEventListener('change', function() {
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Create image element
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '50%';
                    
                    // Clear profile picture and append image
                    profilePicture.innerHTML = '';
                    profilePicture.appendChild(img);
                };
                
                reader.readAsDataURL(fileInput.files[0]);
            }
        });
    });
    
    // Remove profile picture
    removeBtn.addEventListener('click', function() {
        // Reset profile picture to default icon
        profilePicture.innerHTML = '<i class="fas fa-user"></i>';
    });
    
    // Save profile changes
    saveBtn.addEventListener('click', function() {
        alert('Profile changes saved successfully!');
    });
});