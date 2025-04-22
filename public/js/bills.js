// Bills functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const billCards = document.querySelectorAll('.bill-card');
    const searchInput = document.querySelector('.search-input');

    const editModal = document.getElementById('editModal');
    const closeModalBtn = document.getElementById('closeModal');
    const editForm = document.getElementById('editBillForm');

    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter bills based on selected tab
            const tabType = this.getAttribute('data-tab');
            // console.log("tabType: ", tabType);

            billCards.forEach(card => {
                const status = card.querySelector('.bill-status').textContent.toLowerCase().trim();
                // console.log("status: ", status);

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


    // Show and hide bill menu
    const billMenuButtons = document.querySelectorAll('.bill-menu-btn');

    billMenuButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();

            // Close any other open menus
            document.querySelectorAll('.bill-menu-options').forEach(menu => {
                menu.style.display = 'none';
            });

            // Toggle current menu
            const menu = this.nextElementSibling;
            menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
        });
    });

    // Hide menu if clicked outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.bill-menu-options').forEach(menu => {
            menu.style.display = 'none';
        });
    });


    // Handle menu options clicks
    // Edit Button
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const billId = btn.getAttribute('data-id');
            console.log("Edit billId: ", billId);
            // Redirect or open a modal
            // window.location.href = `/bills/edit/${billId}`;
        });
    });

    // Edit Button
    // Open Edit Modal
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const billId = btn.getAttribute('data-id');
            const card = btn.closest('.bill-card');

            // Extract data from the card
            const title = card.querySelector('h3')?.textContent.trim() || '';
            const category = card.querySelector('.bill-card-header p')?.textContent.trim() || '';
            const amount = card.querySelector('.bill-amount')?.textContent.replace(/[^\d.]/g, '') || '';
            const dateText = card.querySelector('.bill-date span')?.textContent.trim();
            const frequency = card.querySelector('.bill-frequency')?.textContent.trim();

            // Convert display date to yyyy-mm-dd for input
            const parsedDate = new Date(dateText);
            const dueDate = parsedDate.toISOString().split('T')[0];

            // Fill form values
            document.getElementById('editBillId').value = billId;
            document.getElementById('editTitle').value = title;
            document.getElementById('editCategory').value = category;
            document.getElementById('editAmount').value = amount;
            document.getElementById('editDueDate').value = dueDate;
            document.getElementById('recurringPeriod').value = frequency;

            editModal.style.display = 'flex';
        });
    });

    // Close Modal
    closeModalBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Submit Edit Form
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const billId = document.getElementById('editBillId').value;

        const updatedData = {
            billName: document.getElementById('editTitle').value.trim(),
            category: document.getElementById('editCategory').value.trim(),
            amount: parseFloat(document.getElementById('editAmount').value),
            dueDate: document.getElementById('editDueDate').value,
            recurringPeriod: document.getElementById('recurringPeriod').value
        };

        console.log("Update Bill:", billId, updatedData);

        // Uncomment for actual request
        try {
            const response = await fetch(`/api/v1/bills/updatebill/${billId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const result = await response.json();
            if (result.success) {
                location.reload();
            } else {
                alert("Failed to update bill.");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating bill.");
        }

        editModal.style.display = 'none';
    });


    // Mark as Paid Button
    document.querySelectorAll('.mark-paid-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const billId = btn.getAttribute('data-id');
            console.log("Mark as paid billId: ", billId);
            const confirmDelete = confirm("Are you sure you paid this bill?");
            if (!confirmDelete) return;

            try {
                const response = await fetch(`api/v1/bills/mark-paid/${billId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const result = await response.json();
                if (result.success) {
                    location.reload(); // Reload to update UI
                } else {
                    alert('Failed to mark as paid');
                }
            } catch (err) {
                console.error(err);
                alert('Error marking bill as paid');
            }
        });
    });

    // Delete Button
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const billId = btn.getAttribute('data-id');
            console.log("Delete billId: ", billId);
            const confirmDelete = confirm("Are you sure you want to delete this bill?");
            if (!confirmDelete) return;

            try {
                const response = await fetch(`api/v1/bills/deletebill/${billId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const result = await response.json();
                if (result.success) {
                    location.reload(); // Refresh to remove deleted bill
                } else {
                    alert('Failed to delete bill');
                }
            } catch (err) {
                console.error(err);
                alert('Error deleting bill');
            }
        });
    });
});