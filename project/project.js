document.addEventListener('DOMContentLoaded', function() {
    // All project cards
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    // Clone projects grid for mobile view
    const mobileProjects = document.createElement('div');
    mobileProjects.className = 'mobile-projects';
    
    // Variables for pagination
    let currentPage = 1;
    const projectsPerPage = 3;
    const totalPages = Math.ceil(projectCards.length / projectsPerPage);
    
    // Function to handle responsive design
    function handleResponsiveLayout() {
        if (window.innerWidth <= 576) {
            // Mobile view: show pagination and 3 projects per page
            if (!document.querySelector('.mobile-projects')) {
                // Create mobile view if it doesn't exist
                projectsGrid.style.display = 'none';
                
                // Clone the projects for mobile view
                mobileProjects.innerHTML = '';
                
                // Display only first 3 projects initially
                showProjectsForPage(1);
                
                projectsGrid.parentNode.insertBefore(mobileProjects, projectsGrid.nextSibling);
                document.querySelector('.pagination').style.display = 'flex';
            }
        } else {
            // Desktop view: show grid, hide pagination
            projectsGrid.style.display = 'grid';
            if (document.querySelector('.mobile-projects')) {
                document.querySelector('.mobile-projects').remove();
            }
            document.querySelector('.pagination').style.display = 'none';
        }
    }
    
    // Function to show projects for specific page
    function showProjectsForPage(page) {
        mobileProjects.innerHTML = '';
        const startIndex = (page - 1) * projectsPerPage;
        const endIndex = Math.min(startIndex + projectsPerPage, projectCards.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const clone = projectCards[i].cloneNode(true);
            mobileProjects.appendChild(clone);
            
            // Add hover effects for mobile
            addHoverEffects(clone);
        }
    }
    
    // Function to add hover effects
    function addHoverEffects(card) {
        // Parallax effect on hover
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 10;
            const yPercent = (y / rect.height - 0.5) * 10;
            
            card.style.transform = `perspective(1000px) rotateY(${xPercent}deg) rotateX(${-yPercent}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        });
    }
    
    // Add hover effects to all project cards
    projectCards.forEach(addHoverEffects);
    
    // Handle pagination
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (btn.classList.contains('next')) {
                // Next button
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                    showProjectsForPage(currentPage);
                }
            } else {
                // Number button
                const pageNum = parseInt(btn.textContent);
                if (pageNum && pageNum !== currentPage) {
                    currentPage = pageNum;
                    updatePagination();
                    showProjectsForPage(currentPage);
                }
            }
        });
    });
    
    // Update pagination active state
    function updatePagination() {
        paginationBtns.forEach(btn => {
            if (btn.textContent == currentPage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Apply the responsive layout
    handleResponsiveLayout();
    
    // Listen for window resize
    window.addEventListener('resize', handleResponsiveLayout);
    
    // Add subtle reveal animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Random subtle movement for cards
    projectCards.forEach(card => {
        const randomDelay = Math.random() * 5;
        card.style.animation = `float 6s ease-in-out ${randomDelay}s infinite`;
    });
    
    // Add floating animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
        }
    `;
    document.head.appendChild(style);
});




// Wait for DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // ==================== Device Detection ====================
    
    // Function to check if we're on a mobile device
    function isMobileDevice() {
        return window.innerWidth <= 992;
    }
    
    // ==================== Animations and UI Effects ====================
    
    // Add animations to the profile name for visual enhancement
    const userNameElement = document.querySelector('.userz-name');
    if (userNameElement) {
        userNameElement.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        userNameElement.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // ==================== Desktop Navigation Interaction ====================
    
    // Get all navigation items from the desktop menu
    const desktopNavItems = document.querySelectorAll('.navz-desktop-item');
    
    // Add click event listener to each desktop navigation item
    desktopNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
        
            
            // Remove active class from all navigation items
            desktopNavItems.forEach(nav => {
                nav.classList.remove('navz-desktop-active');
            });
            
            // Add active class to clicked item
            this.classList.add('navz-desktop-active');
            
            // Add subtle animation
            const icon = this.querySelector('i');
            if (icon) {
                icon.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 300,
                    iterations: 1
                });
            }
            
            // You would typically add page navigation logic here
            console.log(`Desktop Nav: ${this.querySelector('span').textContent}`);
        });
    });
    
    // ==================== Mobile Navigation Interaction ====================
    
    // Get all navigation items from the mobile bottom menu
    const mobileNavItems = document.querySelectorAll('.navz-mobile-item');
    const highlightRing = document.querySelector('.highlightz-ring');
    
    // Position the highlight ring on the active item initially
    function positionHighlightRing() {
        const activeItem = document.querySelector('.navz-mobile-active');
        if (activeItem && highlightRing) {
            // Get the position of the active item
            const itemRect = activeItem.getBoundingClientRect();
            const navRect = document.querySelector('.navbarz-bottom-mobile').getBoundingClientRect();
            
            // Calculate position relative to the navbar
            const leftPosition = itemRect.left - navRect.left + (itemRect.width / 2);
            
            // Set the highlight position
            highlightRing.style.transform = `translateX(${leftPosition - 25}px)`;
        }
    }
    
    // Add click event listener to each mobile navigation item
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {

            
            // Remove active class from all navigation items
            mobileNavItems.forEach(nav => {
                nav.classList.remove('navz-mobile-active');
            });
            
            // Add active class to clicked item
            this.classList.add('navz-mobile-active');
            
            // Move highlight ring to this item
            if (highlightRing) {
                // Get the position of this item
                const itemRect = this.getBoundingClientRect();
                const navRect = document.querySelector('.navbarz-bottom-mobile').getBoundingClientRect();
                
                // Calculate position relative to the navbar
                const leftPosition = itemRect.left - navRect.left + (itemRect.width / 2);
                
                // Set the highlight position with animation
                highlightRing.style.transform = `translateX(${leftPosition - 25}px)`;
                
                // Add pulse animation to the highlight
                highlightRing.animate([
                    { transform: `translateX(${leftPosition - 25}px) scale(0.9)` },
                    { transform: `translateX(${leftPosition - 25}px) scale(1.1)` },
                    { transform: `translateX(${leftPosition - 25}px) scale(1)` }
                ], {
                    duration: 400,
                    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                });
            }
            
            // Add animation to the icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-5px)' },
                    { transform: 'translateY(-2px)' }
                ], {
                    duration: 300,
                    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                });
            }
            
            // You would typically add page navigation logic here
            console.log(`Mobile Nav: ${this.querySelector('span').textContent}`);
        });
    });
    
    // ==================== Post Engagement Interaction ====================
    
    // Get all engagement action buttons (like, comment, share)
    const engagementActions = document.querySelectorAll('.engagez-action');
    
    // Add click event listener to each engagement action
    engagementActions.forEach(action => {
        action.addEventListener('click', function() {
            // Toggle active state for engagement actions
            const isActive = this.classList.contains('engagez-active');
            
            if (isActive) {
                this.classList.remove('engagez-active');
                this.style.color = '';
            } else {
                this.classList.add('engagez-active');
                this.style.color = '#a970ff';
                
                // Add a small animation for feedback
                const icon = this.querySelector('i');
                if (icon) {
                    icon.animate([
                        { transform: 'scale(1)' },
                        { transform: 'scale(1.2)' },
                        { transform: 'scale(1)' }
                    ], {
                        duration: 300,
                        iterations: 1
                    });
                }
                
                // Update the count for demo purposes
                const countElement = this.querySelector('span');
                if (countElement) {
                    let count = parseInt(countElement.textContent);
                    if (!isActive) {
                        count += 1;
                    } else {
                        count -= 1;
                    }
                    countElement.textContent = count;
                }
            }
            
            // For demo purposes, log the interaction
            console.log(`${this.querySelector('i').className} interaction`);
        });
    });
    
    // ==================== Search Box Interaction ====================
    
    // Add focus styles to search box
    const searchBox = document.querySelector('.searchz-box');
    const searchInput = searchBox ? searchBox.querySelector('input') : null;
    
    if (searchBox && searchInput) {
        searchInput.addEventListener('focus', function() {
            searchBox.style.boxShadow = '0 0 0 2px rgba(169, 112, 255, 0.5)';
            searchBox.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        });
        
        searchInput.addEventListener('blur', function() {
            searchBox.style.boxShadow = '';
            searchBox.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
    }
    
    // ==================== Mobile Search Button ====================
    
    // Handle mobile search button click
    const mobileSearchButton = document.querySelector('.actionz-button-mobile');
    
    if (mobileSearchButton) {
        mobileSearchButton.addEventListener('click', function() {
            // For demo purposes, you might show a search overlay
            alert('Search functionality would open here on mobile');
        });
    }
    
    // ==================== Responsive Adjustments ====================
    
    // Initial positioning for mobile navigation highlight
    if (isMobileDevice() && highlightRing) {
        positionHighlightRing();
    }
    
    // Reposition highlight ring on window resize
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isMobileDevice() && highlightRing) {
                positionHighlightRing();
            }
        }, 150);
    });
    
    
    // Initialize mobile UI if needed
    if (isMobileDevice()) {
        console.log('Mobile view initialized');
        // Any additional mobile-specific initializations can go here
    }
});