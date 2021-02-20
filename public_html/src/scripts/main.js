/**
 * Colour Palette Generator.
 *
 * Generate colour pallettes.
 *
 * @author Louis Young
 */

/**
 * Colour.
 *
 * Generate random colours.
 */

class Colour {
  static random() {
    const letters = "0123456789ABCDEF";

    let colour = "#";

    while (colour.length < 7) {
      colour += letters[Math.floor(Math.random() * 16)];
    }

    return colour;
  }
}

/**
 * Swatch.
 */

class Swatch {
  constructor(element) {
    this.element = element;

    this.copy = this.element.querySelector(".copy");

    this.colour = Colour.random();

    this.randomise();

    this.clipboard();
  }

  randomise() {
    this.element.style.background = this.colour;
  }

  clipboard() {
    this.copy.value = this.colour;
  }
}

/**
 * Swatches.
 *
 * Controller for swatches.
 */

class Swatches {
  constructor(selector) {
    this.swatches = document.querySelectorAll(selector);
  }

  randomise() {
    this.swatches.forEach((swatch) => {
      if (swatch.hasAttribute("data-locked")) {
        return;
      }

      new Swatch(swatch); // eslint-disable-line no-new
    });
  }
}

class Notification {
  constructor(message) {
    this.message = message;

    this.notification = document.querySelector(".notification");

    this.notificationText = this.notification.querySelector(".notification__text");

    this.show();
  }

  show() {
    this.notificationText.textContent = this.message;

    this.notification.classList.add("notification--show");

    setTimeout(() => {
      this.hide();
    }, 1500);
  }

  hide() {
    this.notification.classList.remove("notification--show");
  }
}

// DOM Events.

// Load.
const swatches = new Swatches(".swatch");

document.addEventListener("DOMContentLoaded", swatches.randomise());

// Palette interaction.
const palette = document.querySelector(".swatches");

palette.addEventListener("click", (event) => {
  if (event.target.classList.contains("copy")) {
    document.execCommand("copy");
  }
  // Lock swatch.
  if (event.target.classList.contains("lock")) {
    const lock = event.target;

    lock.parentElement.toggleAttribute("data-locked");
  }

  // Switch colour.
  if (event.target.classList.contains("swatch")) {
    const swatch = event.target;

    new Swatch(swatch); // eslint-disable-line no-new
  }
});

// Copy colour.
palette.addEventListener("copy", (event) => {
  event.preventDefault();

  event.clipboardData.setData("text/plain", event.target.value);

  event.target.select();

  new Notification("Copied"); // eslint-disable-line no-new
});

// Randomise button.
const random = document.querySelector(".random");

random.addEventListener("click", () => {
  swatches.randomise();
});
