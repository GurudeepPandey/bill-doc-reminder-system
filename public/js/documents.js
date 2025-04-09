// Documents functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const documentCards = document.querySelectorAll('.document-card');
    const searchInput = document.querySelector('.search-input');
    
    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
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
    searchInput.addEventListener('input', function() {
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
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Here you would typically show a dropdown menu
            alert('Document menu options would appear here');
        });
    });
});