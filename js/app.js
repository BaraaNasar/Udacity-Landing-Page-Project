/**
 * DOM Manipulation Script
 * Dynamically builds navigation,
 * scrolls to sections smoothly,
 * and highlights the active section.
 */

// Define the sections and corresponding navigation items
const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'features', title: 'Features' },
    { id: 'gallery', title: 'Gallery' },
    { id: 'contact', title: 'Contact' }
];

// Select the container where the navigation will be appended
const navBar = document.querySelector('.navbar');

// Dynamically build the navigation list
const ul = document.createElement('ul');
ul.id = 'navbar__list';  // Optional: Adding an ID for styling

// Create list items dynamically based on the sections array
sections.forEach(section => {
    const li = document.createElement('li');  // Create li element
    const button = document.createElement('button');  // Create button inside li
    button.classList.add('nav-button');  // Add class for styling
    button.setAttribute('data-scroll-to', section.id);  // Add data attribute to scroll
    button.textContent = section.title;  // Set the button text

    // Append the button to the list item
    li.appendChild(button);
    // Append the list item to the unordered list
    ul.appendChild(li);
});

// Append the dynamically created navigation list to the navbar container
navBar.appendChild(ul);

/**
 * Scroll to Section on Button Click
 */
const buttons = document.querySelectorAll('.nav-button');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSection = document.getElementById(button.dataset.scrollTo);
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

/**
 * Add 'active' class to section when near top of viewport
 */
const offset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

// Remove the active class from the section
const removeActive = (section) => {
    section.classList.remove('your-active-class');
};

// Add the active class to the section
const addActive = (conditional, section) => {
    if (conditional) {
        section.classList.add('your-active-class');
    }
};

/**
 * Implementing the section activation logic
 * Add 'active' class when section is in the viewport
 */
const sectionActivation = () => {
    sections.forEach(section => {
        const elementOffset = offset(document.getElementById(section.id));  // Fix here: Access actual section in DOM
        const inViewport = elementOffset < window.innerHeight && elementOffset >= -document.getElementById(section.id).offsetHeight;

        // Remove the active class from all sections
        removeActive(document.getElementById(section.id));

        // Add the active class only if the section is in the viewport
        addActive(inViewport, document.getElementById(section.id));
    });
};

// Event listener for scroll to check section visibility
window.addEventListener('scroll', sectionActivation);

// Also run once on page load to ensure the correct section is highlighted
window.addEventListener('load', sectionActivation);

/**
 * Handle Clicked Link and Keep Active State
 */
buttons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove the active state from all nav buttons
        buttons.forEach(btn => btn.classList.remove('active'));

        // Add the active state to the clicked nav button
        this.classList.add('active');
    });
});
