
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');
    const sidebarClose = document.getElementById('sidebarClose');
    
    // Toggle sidebar when menu button is clicked
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
        menuToggle.classList.add('hidden');  
    });
    
    // Close sidebar when clicking on overlay
    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        mainContent.classList.remove('sidebar-active');
        menuToggle.classList.remove('hidden');  
    });
    
    // Close sidebar when clicking close button
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            mainContent.classList.remove('sidebar-active');
            menuToggle.classList.remove('hidden');
        });
    } else {
        console.log('Sidebar close button not found'); // Debug log
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Only adjust the toggle button visibility on resize
        if (window.innerWidth > 768 && !sidebar.classList.contains('active')) {
            menuToggle.classList.remove('hidden');
        }
    });

    // Fix progress circles in project table
    document.querySelectorAll('.progress-circle svg circle.progress-value').forEach(circle => {
        const circumference = 2 * Math.PI * 15; // 2πr where r=15
        circle.setAttribute('stroke-dasharray', circumference);

        // Get the parent SVG element
        const svgElement = circle.closest('svg');
        // Find the progress text within the parent div of the SVG
        const percentTextElem = svgElement.parentNode.querySelector('.progress-text');
        
        if (percentTextElem) {
            const percentText = percentTextElem.textContent || '0%';
            const percent = parseInt(percentText) || 0;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }
    });

    // Task check functionality
    document.querySelectorAll('.task-check').forEach(check => {
        check.addEventListener('click', function() {
            if (this.textContent.trim() === '✓') {
                this.textContent = ' ';
                this.style.backgroundColor = 'white';
                this.style.color = 'black';
            } else {
                this.textContent = '✓';
                this.style.backgroundColor = '#ff5722';
                this.style.color = 'white';
            }
        });
    });

    // Task tab selection functionality
    document.querySelectorAll('.task-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Ensure all progress circles have the correct attributes
    document.querySelectorAll('.progress-circle svg circle.progress-bg').forEach(circle => {
        // Set standard attributes for background circles if missing
        if (!circle.hasAttribute('cx')) circle.setAttribute('cx', '20');
        if (!circle.hasAttribute('cy')) circle.setAttribute('cy', '20');
        if (!circle.hasAttribute('r')) circle.setAttribute('r', '15');
    });

    // Initialize gauge chart if it exists
    const gaugeCompleted = document.getElementById('gauge-completed');
    const gaugeOngoing = document.getElementById('gauge-ongoing');
    const gaugeDelayed = document.getElementById('gauge-delayed');
    
    if (gaugeCompleted && gaugeOngoing && gaugeDelayed) {
        // Set correct dasharray and dashoffset values for the gauge chart
        const gaugeLength = 251.2; // Approximate path length for a semi-circle with r=80
        
        // Example: 70% completed, 20% ongoing, 10% delayed
        const completedPercent = 0.28; // 28%
        const ongoingPercent = 0.32;   // 35%
        const delayedPercent = 0.35;   // 37%
        
        gaugeCompleted.setAttribute('stroke-dasharray', `${completedPercent * gaugeLength} ${gaugeLength}`);
        gaugeOngoing.setAttribute('stroke-dasharray', `${ongoingPercent * gaugeLength} ${gaugeLength}`);
        gaugeDelayed.setAttribute('stroke-dasharray', `${delayedPercent * gaugeLength} ${gaugeLength}`);
        
        // Set correct offsets
        gaugeOngoing.setAttribute('stroke-dashoffset', `${-completedPercent * gaugeLength}`);
        gaugeDelayed.setAttribute('stroke-dashoffset', `${-(completedPercent + ongoingPercent) * gaugeLength}`);
    }

    const userInfo = document.getElementById('userInfo');
    const userPopover = document.getElementById('userPopover');
    const accountSettings = document.getElementById('accountSettings');
    const getSupport = document.getElementById('getSupport');
    const logout = document.getElementById('logout');
    
    // Toggle popover on user info click
    userInfo.addEventListener('click', function(event) {
        if (!userPopover.contains(event.target)) {
            userPopover.classList.toggle('active');
            event.stopPropagation();
        }
    });
    
    // Close userPopover when clicking outside
    document.addEventListener('click', function(event) {
        if (!userInfo.contains(event.target)) {
            userPopover.classList.remove('active');
        }
    });
    
    // Handle option clicks
    accountSettings.addEventListener('click', function() {
        console.log('Account Settings clicked');
        userPopover.classList.remove('active');
    });
    
    getSupport.addEventListener('click', function() {
        console.log('Get Support clicked');
        userPopover.classList.remove('active');
    });
    
    logout.addEventListener('click', function() {
        console.log('Logout clicked');
        userPopover.classList.remove('active');
    });

    const notification = document.querySelector('.notification');
    const popover = document.querySelector('.notification-popover');

    notification.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop event from propagating
        // Toggle the active class to show/hide the popover
        popover.classList.toggle('active');
    });

    // Close popover when clicking outside
    document.addEventListener('click', (e) => {
        if (!notification.contains(e.target) && !popover.contains(e.target)) {
            popover.classList.remove('active');
        }
    });

    const createButton = document.querySelector('.create-project');
    const popup = document.getElementById('projectPopup');
    const closeButton = document.querySelector('.close-popup');
    const form = document.getElementById('createProjectForm');
    
    // Open popup when create button is clicked
    createButton.addEventListener('click', function() {
        popup.style.display = 'flex';
    });
    
    // Close popup when X is clicked
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    
    // Close popup when clicking outside the content
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('projectName').value;
        const projectManager = document.getElementById('projectManager').value;
        const description = document.getElementById('projectDescription').value;
        const duedate = document.getElementById('projectDuedate').value;
        const category = document.getElementById('projectCategory').value;
        
        // submitted data
        console.log('Project Name:', name);
        console.log('Project Manager:', projectManager);
        console.log('Description:', description);
        console.log('duedate:', duedate);
        console.log('Category:', category);
        
        // Close popup
        popup.style.display = 'none';
        
        // Optional: Reset form
        form.reset();
    });
});