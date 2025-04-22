// Documents functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const documentCards = document.querySelectorAll('.document-card');
    const searchInput = document.querySelector('.search-input');

    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter documents based on selected tab
            const tabType = this.getAttribute('data-tab');

            documentCards.forEach(card => {
                const status = card.querySelector('.document-status').textContent.toLowerCase();

                if (tabType === 'all' || status === tabType) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        documentCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.querySelector('.document-title p').textContent.toLowerCase();

            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Document menu functionality
    const documentMenuButtons = document.querySelectorAll('.document-menu-btn');

    documentMenuButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            // Here you would typically show a dropdown menu
            alert('Document menu options would appear here');
        });
    });

    // Render documents
    function renderDocuments() {
        const documents = JSON.parse(localStorage.getItem('documents')) || [];
        const container = document.querySelector('.documents-grid');
        container.innerHTML = ''; // Clear existing cards

        documents.forEach((doc) => {
            const expiryDate = new Date(doc.expiryDate);
            const today = new Date();
            const isExpired = expiryDate < today.setHours(0, 0, 0, 0);
            const statusClass = isExpired ? 'expired' : 'active';
            const statusText = isExpired ? 'Expired' : 'Active';

            // Format expiry date
            const formattedDate = expiryDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            const cardHTML = `
            <div class="document-card">
              <div class="document-card-header">
                <div class="document-icon">
                  <i class="fas fa-id-card"></i>
                </div>
                <div class="document-title">
                  <h3>${doc.docName}</h3>
                  <p>${doc.category}</p>
                </div>
                <button class="document-menu-btn">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </div>
              <div class="document-card-body">
                <div class="document-expiry">
                  <i class="far fa-calendar"></i>
                  <span>Expires: ${formattedDate}</span>
                </div>
              </div>
              <div class="document-card-footer">
                <span class="document-status ${statusClass}">${statusText}</span>
              </div>
            </div>
          `;

            container.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // Call the function to render when the page loads
    renderDocuments();
});