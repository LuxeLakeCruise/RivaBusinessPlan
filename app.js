// Riva Luxury Charter Business Plan - Interactive Features

document.addEventListener('DOMContentLoaded', function() {

    // Animated Counter Function
    function animateCounter(element, target, duration = 2000, suffix = '') {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format numbers with commas for large values
            let displayValue = Math.floor(current);
            if (displayValue >= 1000) {
                displayValue = displayValue.toLocaleString('it-IT');
            }

            element.textContent = displayValue + suffix;
        }, 16);
    }

    // Initialize hero metric counters with intersection observer
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricCards = entry.target.querySelectorAll('.metric-value');
                metricCards.forEach(card => {
                    const target = parseInt(card.dataset.target);
                    let suffix = '';

                    // Add appropriate suffix based on value
                    if (target === 368) {
                        suffix = '%';
                    }

                    animateCounter(card, target, 2500, suffix);
                });

                heroObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Progress Bar Animation
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.dataset.width + '%';
                        bar.style.width = width;
                    }, index * 200);
                });

                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const exitSection = document.querySelector('#exit');
    if (exitSection) {
        progressObserver.observe(exitSection);
    }

    // Financial Chart
    const ctx = document.getElementById('profitsChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2026', '2027', '2028', '2029', '2030'],
                datasets: [{
                    label: 'Utili Netti (€)',
                    data: [589986, 951920, 1432844, 2362864, 3444140],
                    borderColor: '#17375e',
                    backgroundColor: 'rgba(23, 55, 94, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#DAA520',
                    pointBorderColor: '#17375e',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#17375e',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '€' + value.toLocaleString('it-IT');
                            },
                            color: '#17375e',
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        },
                        grid: {
                            color: 'rgba(23, 55, 94, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#17375e',
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        },
                        grid: {
                            color: 'rgba(23, 55, 94, 0.1)'
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation Observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Apply scroll animations to elements
    document.querySelectorAll('.summary-card, .advantage-card, .exit-card, .timeline-item').forEach(el => {
        el.classList.add('fade-in');
        scrollObserver.observe(el);
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Add active class styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #DAA520 !important;
        }
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Console log for successful load
    console.log('🚤 Riva Luxury Charter Business Plan loaded successfully!');
    console.log('📊 Interactive features initialized');
    console.log('🎯 ROI: 368% in 5 years');
});