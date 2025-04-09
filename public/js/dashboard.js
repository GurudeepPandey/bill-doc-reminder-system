// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize bill distribution chart
    const ctx = document.getElementById('billDistributionChart');
    
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Housing', 'Utilities', 'Insurance', 'Entertainment', 'Other'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        '#9c27b0', // Purple
                        '#3f51b5', // Indigo
                        '#4caf50', // Green
                        '#ff9800', // Orange
                        '#03a9f4'  // Light Blue
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
});