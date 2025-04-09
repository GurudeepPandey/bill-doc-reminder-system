// Bills functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const billCards = document.querySelectorAll('.bill-card');
    const searchInput = document.querySelector('.search-input');

    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter bills based on selected tab
            const tabType = this.getAttribute('data-tab');

            billCards.forEach(card => {
                const status = card.querySelector('.bill-status').textContent.toLowerCase();

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

        billCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.querySelector('.bill-card-header p').textContent.toLowerCase();

            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Bill menu functionality
    const billMenuButtons = document.querySelectorAll('.bill-menu-btn');

    billMenuButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            // Here you would typically show a dropdown menu
            alert('Bill menu options would appear here');
        });
    });


    // add new form functionalty
});