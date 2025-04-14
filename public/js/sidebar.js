// Sidebar functionality
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarFooter = document.querySelector('.sidebar-footer');

    const but = document.querySelector('.but');
    but.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        sidebarNav.classList.toggle('active');
        sidebarFooter.classList.toggle('active');
    });

    toggleSidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle('active');
        sidebarNav.classList.toggle('active');
        sidebarFooter.classList.toggle('active');
    })

    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', async () => {
        const response = await fetch('/api/v1/user/logout');
        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }
        window.location.href = '/';
    })
});
