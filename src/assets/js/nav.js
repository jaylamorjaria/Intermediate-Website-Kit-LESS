// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

CShamburgerMenu.addEventListener('click', function() {
    CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    // run the function to check the aria-expanded value
    ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
function ariaExpanded() {
    const csUL = document.querySelector('#cs-expanded');
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
        csUL.setAttribute('aria-expanded', 'true');
    } else {
        csUL.setAttribute('aria-expanded', 'false');
    }
}

// mobile nav dropdown code if needed
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
    for (const item of dropDowns) {
        const onClick = () => {
        item.classList.toggle('cs-active')
    }
    item.addEventListener('click', onClick)
    }
                            

// Add event listeners to each dropdown element for accessibility
const dropdownElements = document.querySelectorAll(".cs-dropdown");
dropdownElements.forEach(element => {
    let escapePressed = false;

    element.addEventListener("focusout", function (event) {
        // Skip the focusout logic if escape was pressed
        if (escapePressed) {
            escapePressed = false;
            return;
        }

        // If the focus has moved outside the dropdown, remove the active class from the dropdown 
        if (!element.contains(event.relatedTarget)) {
            element.classList.remove("cs-active");
            const dropdownButton = element.querySelector(".cs-dropdown-button");

            if (dropdownButton) {
                toggleAriaExpanded(dropdownButton);
            }
        }
    });

    element.addEventListener("keydown", function (event) {
        if (element.classList.contains("cs-active")) {
            event.stopPropagation();
        }

        // Pressing Enter or Space will toggle the dropdown and adjust the aria-expanded attribute
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleDropdown(element);
        }

        // Pressing Escape will remove the active class from the dropdown. The stopPropagation above will stop the hamburger menu from closing
        if (event.key === "Escape") {
            escapePressed = true;
            toggleDropdown(element);
        }
    });

    // Handles dropdown menus on mobile - the matching media query (max-width: 63.9375rem) is necessary so that clicking the dropdown button on desktop does not add the active class and thus interfere with the hover state
    const maxWidthMediaQuery = window.matchMedia("(max-width: 63.9375rem)");
    if (maxWidthMediaQuery.matches) {
        element.addEventListener("click", () => toggleDropdown(element));
    }
});

// Pressing Enter will redirect to the href
const dropdownLinks = document.querySelectorAll(".cs-drop-li > .cs-li-link");
dropdownLinks.forEach(link => {
    link.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            window.location.href = this.href;
        }
    });
});

// If you press Escape and the hamburger menu is open, close it
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && hamburgerMenu.classList.contains("cs-active")) {
        toggleMenu();
    }
});
