declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Pressiona a tecla TAB.
       */
      pressionarTab(): Chainable<void>;
    }
  }
}

export {};
