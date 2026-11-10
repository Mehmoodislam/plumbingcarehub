/**
 * PlumbingCareHub - ProPlumb Theme Vanilla JavaScript
 * Zero external dependencies, fast, accessible, responsive
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile & Tablet Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const tabletMenuBtn = document.getElementById('tabletMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');

    function openMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (tabletMenuBtn) tabletMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);

    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) closeMobileMenu();
        });

        // Mobile Services Accordion Toggle
        const mobileServicesToggle = document.getElementById('mobileServicesToggle');
        const mobileServicesMenu = document.getElementById('mobileServicesMenu');
        const mobileServicesChevron = document.getElementById('mobileServicesChevron');
        if (mobileServicesToggle && mobileServicesMenu) {
            mobileServicesToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isHidden = mobileServicesMenu.classList.contains('hidden');
                if (isHidden) {
                    mobileServicesMenu.classList.remove('hidden');
                    mobileServicesChevron?.classList.add('rotate-180', 'text-blue-600');
                } else {
                    mobileServicesMenu.classList.add('hidden');
                    mobileServicesChevron?.classList.remove('rotate-180', 'text-blue-600');
                }
            });
        }
    }

    // 2. Sticky Navbar Shadow Effect on Scroll
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header?.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
            header?.classList.remove('bg-white');
        } else {
            header?.classList.remove('shadow-md', 'backdrop-blur-md');
            header?.classList.add('bg-white');
        }
    });

    // 3. Interactive Services Tab Switcher (Matches Exact Layout in Screenshot)
    const servicesData = {
        'leak-repair': {
            title: 'Leak Repair & Water Diagnostics',
            desc: 'Stop leaks before they cause bigger structural problems. Our acoustic leak detectors pinpoint hidden leaks behind walls and under slabs with zero unnecessary destruction.',
            bullets: [
                'Quick 30-45 Minute Response',
                'Long-lasting Permanent Fix',
                'Affordable Flat-Rate Pricing'
            ],
            image: 'assets/images/service-leak-repair.jpg',
            fallback: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'burst-pipe'
        },
        'pipe-installation': {
            title: 'Pipe Installation & Repiping',
            desc: 'From replacing corroded galvanized pipes to modern durable PEX and copper repiping, our licensed master plumbers install code-compliant plumbing systems engineered to last decades.',
            bullets: [
                'Whole-Home Repiping Solutions',
                'Burst & Ruptured Pipe Bypass',
                'Complete Pressure & Flow Testing'
            ],
            image: 'assets/images/hero-technician-2.jpg',
            fallback: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'pipe-install'
        },
        'bathroom-plumbing': {
            title: 'Bathroom Plumbing & Fixtures',
            desc: 'From overflowing toilets and failed wax rings to shower valve replacements and luxury faucet hookups, we deliver clean, reliable, and high-efficiency craftsmanship.',
            bullets: [
                'Toilet Overflow & Wax Flange Fixes',
                'Shower Valve & Cartridge Leaks',
                'Modern Sink & Faucet Installs'
            ],
            image: 'assets/images/hero-technician-1.jpg',
            fallback: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'bathroom'
        },
        'water-heater': {
            title: 'Water Heater Services & Installs',
            desc: 'No hot water or an actively leaking tank in your basement? We repair and install both high-efficiency tankless water heaters and traditional gas or electric storage tanks.',
            bullets: [
                'Same-Day Emergency Installation',
                'Thermostat, Gas Valve & Heating Elements',
                'Top Brands: Rheem, Bradford White, Rinnai'
            ],
            image: 'assets/images/hero-technician-3.jpg',
            fallback: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'water-heater'
        },
        'drain-cleaning': {
            title: 'Drain Cleaning & Hydro-Jetting',
            desc: 'Clearing stubborn main line clogs, tree root intrusions, and multi-drain sewer backups. Using 4,000 PSI high-pressure hydro-jetters and HD fiber-optic cameras, we scour pipes clean.',
            bullets: [
                '4,000 PSI Industrial Hydro-Jetting',
                'HD Sewer Camera Video Inspection',
                'Fast Root & Sludge Elimination'
            ],
            image: 'assets/images/faucet-water-drop.jpg',
            fallback: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'clogged-drain'
        }
    };

    const serviceTabs = document.querySelectorAll('.service-tab-btn');
    const serviceTitle = document.getElementById('serviceDetailTitle');
    const serviceDesc = document.getElementById('serviceDetailDesc');
    const serviceBullets = document.getElementById('serviceDetailBullets');
    const serviceImg = document.getElementById('serviceDetailImg');
    const serviceBookBtn = document.getElementById('serviceDetailBookBtn');

    if (serviceTabs.length && serviceTitle) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const key = tab.getAttribute('data-service-key');
                const data = servicesData[key];
                if (!data) return;

                // Reset all tabs to inactive state
                serviceTabs.forEach(t => {
                    t.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/20');
                    t.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-50', 'border-slate-200');
                    const arrow = t.querySelector('.tab-arrow');
                    if (arrow) arrow.classList.add('opacity-0');
                    const icon = t.querySelector('.tab-icon');
                    if (icon) {
                        icon.classList.remove('text-white');
                        icon.classList.add('text-blue-600');
                    }
                });

                // Set active tab styling
                tab.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-50', 'border-slate-200');
                tab.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/20');
                const activeArrow = tab.querySelector('.tab-arrow');
                if (activeArrow) activeArrow.classList.remove('opacity-0');
                const activeIcon = tab.querySelector('.tab-icon');
                if (activeIcon) {
                    activeIcon.classList.remove('text-blue-600');
                    activeIcon.classList.add('text-white');
                }

                // Update detail content
                serviceTitle.textContent = data.title;
                serviceDesc.textContent = data.desc;

                if (serviceImg) {
                    serviceImg.style.opacity = '0.5';
                    setTimeout(() => {
                        serviceImg.src = data.image;
                        serviceImg.onerror = function() {
                            this.onerror = null;
                            this.src = data.fallback;
                        };
                        serviceImg.style.opacity = '1';
                    }, 120);
                }

                if (serviceBullets) {
                    serviceBullets.innerHTML = data.bullets.map(b => `
                        <li class="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                            <span class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">✓</span>
                            <span>${b}</span>
                        </li>
                    `).join('');
                }

                if (serviceBookBtn) {
                    serviceBookBtn.setAttribute('data-service', data.serviceCode);
                }
            });
        });
    }

    // 4. Interactive Emergency First-Aid Triage Guide
    const triageTabs = document.querySelectorAll('.triage-tab-btn');
    const triageData = {
        'burst-pipe': {
            title: 'Burst Pipe & Active Gushing Water',
            tag: 'CRITICAL EMERGENCY (30-Min Dispatch)',
            warning: 'Immediate Safety Action Plan Before Plumber Arrives:',
            steps: [
                'Locate and shut off your property’s <strong>MAIN WATER SHUTOFF VALVE</strong> immediately.',
                'Turn on lowest faucets (garden hose or basement sink) to drain remaining water safely.',
                'Switch off electrical circuit breakers for wet rooms to eliminate electrocution risk.',
                'Move valuables and take quick photos of damage for insurance claims.'
            ],
            note: 'Master technician is on standby for emergency pipe clamp & replacement. No overtime fees.'
        },
        'sewer-backup': {
            title: 'Sewer Line Backup & Black Water Overflow',
            tag: 'BIOHAZARD EMERGENCY (Urgent Response)',
            warning: 'Severe Health Hazard: Contain Area Immediately:',
            steps: [
                'Do not flush any toilets or run taps, dishwashers, or laundry machines.',
                'Keep family members and pets strictly away from contaminated standing water.',
                'Wear protective footwear; never come into skin contact with raw sewage.',
                'Open exterior windows if safe to ventilate hazardous sewer gas and methane.'
            ],
            note: 'Heavy-duty hydro-jetting truck dispatched with HD sewer fiber-optic diagnostic cameras.'
        },
        'water-heater': {
            title: 'Water Heater Tank Failure & Rupture',
            tag: 'WATER HEATER PRIORITY DISPATCH',
            warning: 'Prevent Flood & Gas/Electrical Hazards:',
            steps: [
                'Turn off the cold water shutoff valve located directly above your water heater tank.',
                'For gas heaters: Twist the gas control thermostat dial to the OFF position.',
                'For electric heaters: Switch off the dedicated double-pole 240V breaker in your electric panel.',
                'Never touch standing water near an electric heater if power is still energized.'
            ],
            note: 'Fully stocked mobile trucks carry replacement thermostats, elements, and new Rheem tanks.'
        },
        'clogged-drain': {
            title: 'Severe Clogged Drain & Waste Backup',
            tag: 'SAME-DAY DRAIN CLEARING',
            warning: 'Prevent Pipe Rupture & Chemical Exposure:',
            steps: [
                'Stop using all connected sinks, showers, and tubs immediately.',
                'Do not use store-bought acidic chemical cleaners — they corrode pipes and create splash hazards.',
                'Place towels around overflowing baseboards to prevent floor warping.',
                'Note whether multiple fixtures are backing up simultaneously (indicates mainline block).'
            ],
            note: 'Motorized drain augers and high-pressure jetters clear roots, grease, and debris in 1 visit.'
        }
    };

    if (triageTabs.length) {
        triageTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const key = tab.getAttribute('data-triage');
                const data = triageData[key];
                if (!data) return;

                // Reset all triage tabs
                triageTabs.forEach(t => {
                    t.classList.remove('bg-blue-600', 'text-white', 'border-blue-600', 'shadow-md');
                    t.classList.add('bg-white', 'text-slate-800', 'border-slate-200');
                    const sub = t.querySelector('.triage-sub');
                    if (sub) {
                        sub.classList.remove('text-blue-100');
                        sub.classList.add('text-slate-500');
                    }
                    const iconBox = t.querySelector('.triage-icon');
                    if (iconBox) {
                        iconBox.classList.remove('bg-white/20');
                        iconBox.classList.add('bg-blue-50');
                    }
                });

                // Activate selected triage tab
                tab.classList.remove('bg-white', 'text-slate-800', 'border-slate-200');
                tab.classList.add('bg-blue-600', 'text-white', 'border-blue-600', 'shadow-md');
                const activeSub = tab.querySelector('.triage-sub');
                if (activeSub) {
                    activeSub.classList.remove('text-slate-500');
                    activeSub.classList.add('text-blue-100');
                }
                const activeIconBox = tab.querySelector('.triage-icon');
                if (activeIconBox) {
                    activeIconBox.classList.remove('bg-blue-50');
                    activeIconBox.classList.add('bg-white/20');
                }

                // Update triage display
                const triageDisplay = document.getElementById('triageDisplay');
                if (triageDisplay) {
                    triageDisplay.innerHTML = `
                        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-5">
                            <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span class="flex h-3 w-3 relative">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                                </span>
                                ${data.title}
                            </h3>
                            <span class="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full tracking-wide">
                                ${data.tag}
                            </span>
                        </div>
                        <p class="text-sm text-blue-900 font-semibold mb-3 flex items-center gap-2 bg-blue-50 p-2.5 rounded-lg border border-blue-200">
                            <svg class="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                            ${data.warning}
                        </p>
                        <ul class="space-y-3 text-sm text-slate-700 mb-6">
                            ${data.steps.map(step => `
                                <li class="flex items-start gap-2.5">
                                    <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                        <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div class="text-xs text-slate-700">
                                <span class="font-bold text-slate-900 block">${data.note}</span>
                                <span>No overtime fees. Upfront flat-rate quote before any repair starts.</span>
                            </div>
                            <a href="tel:8005552273" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-md text-sm whitespace-nowrap">
                                <svg class="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z"></path></svg>
                                Call (800) 555-CARE
                            </a>
                        </div>
                    `;
                }
            });
        });
    }

    // 5. Interactive FAQ Accordion (+ and − Toggle Matching Reference Design)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-toggle-icon');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');

                // Close other items
                faqItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.faq-toggle-icon');
                    if (otherContent) otherContent.classList.add('hidden');
                    if (otherIcon) otherIcon.textContent = '+';
                });

                if (!isOpen) {
                    content.classList.remove('hidden');
                    if (icon) icon.textContent = '−';
                } else {
                    content.classList.add('hidden');
                    if (icon) icon.textContent = '+';
                }
            });
        }
    });

    // 6. Live ZIP Code Dispatch Checker
    const zipForm = document.getElementById('zipCheckForm');
    const zipInput = document.getElementById('zipCodeInput');
    const zipResult = document.getElementById('zipResult');

    if (zipForm && zipInput && zipResult) {
        zipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const zip = zipInput.value.trim();
            if (!/^\d{5}$/.test(zip)) {
                zipResult.className = 'mt-2 text-xs font-semibold text-amber-300';
                zipResult.textContent = 'Please enter a valid 5-digit ZIP code.';
                zipResult.classList.remove('hidden');
                return;
            }

            zipResult.className = 'mt-2 text-xs font-semibold text-emerald-300 flex items-center gap-1.5';
            zipResult.innerHTML = `
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                <span>Active Service Area (${zip}): 2 Trucks on standby • Estimated arrival: <strong>28-35 mins</strong></span>
            `;
            zipResult.classList.remove('hidden');
        });
    }

    // 7. Booking Modal Functionality
    const modal = document.getElementById('bookingModal');
    const openModalButtons = document.querySelectorAll('[data-open-modal]');
    const closeModalButtons = document.querySelectorAll('[data-close-modal]');

    function openModal(serviceType = '') {
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        
        if (serviceType) {
            const select = modal.querySelector('#modalServiceSelect');
            if (select) select.value = serviceType;
        }
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const service = btn.getAttribute('data-service') || '';
            openModal(service);
        });
    });

    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // 8. Form Submissions with Toast Notification
    const forms = document.querySelectorAll('form[data-ajax-form]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Dispatching Alert...
                `;
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                showToast('Quote Request Received! Our dispatch desk is contacting your nearest technician now. Expect a call in under 90 seconds.');
                form.reset();
                if (modal && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            }, 1000);
        });
    });

    // 9. Custom Toast Notification
    function showToast(message) {
        let toast = document.getElementById('globalToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'globalToast';
            toast.className = 'fixed bottom-20 right-4 z-50 max-w-md bg-white border-2 border-blue-600 text-slate-800 p-4 rounded-2xl shadow-2xl transition-all duration-300 transform translate-y-10 opacity-0 flex items-start gap-3';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `
            <div class="p-1 bg-blue-100 text-blue-600 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-sm text-slate-900">Request Confirmed</h4>
                <p class="text-xs text-slate-600 mt-0.5">${message}</p>
            </div>
            <button onclick="this.parentElement.classList.add('opacity-0', 'translate-y-10')" class="text-slate-400 hover:text-slate-700">&times;</button>
        `;

        toast.classList.remove('opacity-0', 'translate-y-10');
        toast.classList.add('opacity-100', 'translate-y-0');

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-10');
            toast.classList.remove('opacity-100', 'translate-y-0');
        }, 6000);
    }
});
