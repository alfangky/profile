document.addEventListener('DOMContentLoaded', function() {
    // Fade-in animation for skill cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, 100 * Array.from(document.querySelectorAll('.skill-card')).indexOf(entry.target));
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });

    // Additional subtle animations for floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach(icon => {
        // Random starting position within a small range
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        
        icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    // Interactive hover effects for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badges = this.querySelectorAll('.skill-badge');
            
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.transform = 'scale(1.05)';
                    badge.style.backgroundColor = 'rgba(162, 89, 255, 0.25)';
                }, 50 * index);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const badges = this.querySelectorAll('.skill-badge');
            
            badges.forEach(badge => {
                badge.style.transform = 'scale(1)';
                badge.style.backgroundColor = 'rgba(162, 89, 255, 0.15)';
            });
        });
    });

    // Parallax effect for background elements
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        document.querySelectorAll('.decoration-circle').forEach(circle => {
            const speed = parseFloat(circle.classList.contains('circle-1') ? 0.5 : 0.3);
            circle.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
        
        document.querySelectorAll('.decoration-line').forEach(line => {
            const speed = parseFloat(line.classList.contains('line-1') ? 0.2 : 0.4);
            line.style.transform = `rotate(${line.classList.contains('line-1') ? '-5deg' : '5deg'}) translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
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
    
    // ==================== Mobile Search Button ====================
    
    // Handle mobile search button click
    const mobileSearchButton = document.querySelector('.actionz-button-mobile');
    
    if (mobileSearchButton) {
        mobileSearchButton.addEventListener('click', function() {
            // For demo purposes, you might show a search overlay
            alert('Halo bang');
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
