// Payment History functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tableRows = document.querySelectorAll('.payment-history-table tbody tr');
    const searchInput = document.querySelector('.search-input');
    const dateSelect = document.querySelector('.date-select');
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter payments based on selected tab
            const tabType = this.getAttribute('data-tab');
            
            tableRows.forEach(row => {
                const status = row.querySelector('.payment-status').textContent.toLowerCase();
                
                if (tabType === 'all' || status === tabType) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        tableRows.forEach(row => {
            const description = row.querySelector('.payment-description .title').textContent.toLowerCase();
            const reference = row.querySelector('.payment-description .reference').textContent.toLowerCase();
            const category = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            
            if (description.includes(searchTerm) || reference.includes(searchTerm) || category.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Date filter functionality
    dateSelect.addEventListener('change', function() {
        const filterValue = this.value;
        const today = new Date();
        
        tableRows.forEach(row => {
            const dateText = row.querySelector('.payment-date .date').textContent;
            const paymentDate = new Date(dateText);
            
            let showRow = true;
            
            switch (filterValue) {
                case 'this-month':
                    showRow = paymentDate.getMonth() === today.getMonth() && 
                              paymentDate.getFullYear() === today.getFullYear();
                    break;
                case 'last-month':
                    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
                    showRow = paymentDate >= lastMonth && paymentDate <= lastMonthEnd;
                    break;
                case 'last-3-months':
                    const threeMonthsAgo = new Date(today);
                    threeMonthsAgo.setMonth(today.getMonth() - 3);
                    showRow = paymentDate >= threeMonthsAgo;
                    break;
                case 'last-6-months':
                    const sixMonthsAgo = new Date(today);
                    sixMonthsAgo.setMonth(today.getMonth() - 6);
                    showRow = paymentDate >= sixMonthsAgo;
                    break;
                case 'this-year':
                    showRow = paymentDate.getFullYear() === today.getFullYear();
                    break;
                case 'custom':
                    // Here you would typically show a date range picker
                    alert('Custom date range picker would appear here');
                    break;
                default: // all-time
                    showRow = true;
            }
            
            row.style.display = showRow ? '' : 'none';
        });
    });
    
    // Pagination functionality
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            // Remove active class from all buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button if it's a number
            if (!this.querySelector('i')) {
                this.classList.add('active');
            }
            
            // Here you would typically implement pagination logic
            // For demo purposes, we'll just show an alert
            const page = this.textContent.trim();
            if (page) {
                alert(`Navigating to page ${page}`);
            } else if (this.querySelector('.fa-chevron-left')) {
                alert('Navigating to previous page');
            } else if (this.querySelector('.fa-chevron-right')) {
                alert('Navigating to next page');
            }
        });
    });
    
    // Action button functionality
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Here you would typically show a dropdown menu with actions
            alert('Payment actions menu would appear here (View details, Download receipt, etc.)');
        });
    });
});