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
});
