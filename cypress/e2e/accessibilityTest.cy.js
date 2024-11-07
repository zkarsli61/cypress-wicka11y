/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Accessibility Tests', { tags: ['@accessibility'] }, () => {
  beforeEach(() => {
    cy.visit('http://example.com');
  });

  it('Default analysis', { defaultCommandTimeout: 15000 }, () => {
    cy.checkAccessibility();
  });

  it('All levels of severity', { defaultCommandTimeout: 15000 }, () => {
    cy.checkAccessibility(null, { includedImpacts: ['critical', 'serious', 'moderate', 'minor'] });
  });

  it('Disable rules "contrast" and "valid-lang"', { defaultCommandTimeout: 15000 }, () => {
    cy.checkAccessibility(null, { rules: { 'color-contrast': { enabled: false }, 'valid-lang': { enabled: false } } });
  });

  it('Disable report generation', { defaultCommandTimeout: 15000 }, () => {
    cy.checkAccessibility(null, { generateReport: false, includedImpacts: ['critical', 'serious', 'moderate', 'minor'] });
  });

  it('Provide context as CSS selector and only best-practice', { defaultCommandTimeout: 15000 }, () => {
    cy.checkAccessibility(['div[role="banner"]', 'ul'], { includedImpacts: ['critical', 'serious', 'moderate', 'minor'], runOnly: ['best-practice'] });
  });

  it('Provide context as HTML Element and all levels of severity', { defaultCommandTimeout: 15000 }, () => {
    cy.document().then((doc) => {
      cy.checkAccessibility(doc.getElementById('my-navigation'), { includedImpacts: ['critical', 'serious', 'moderate', 'minor'] });
    });
  });

  it('Provide context as HTML NodeList', { defaultCommandTimeout: 15000 }, () => {
    cy.document().then((doc) => {
      cy.checkAccessibility(doc.querySelectorAll('div[role="banner"], ul'), { includedImpacts: ['critical', 'serious', 'moderate', 'minor'] });
    });
  });

  it('Provide context as "exclude" and "include"', { defaultCommandTimeout: 15000 }, () => {
    cy.checkAccessibility({ exclude: 'li', include: 'li:nth-child(2)' }, { includedImpacts: ['critical', 'serious', 'moderate', 'minor'] });
  });

  it('Custom colors by severity', {defaultCommandTimeout: 15000}, () => {
    const customImpactStyling = {
        critical: { icon: '🔴', style: 'fill: #DE071B; fill-opacity: 0; stroke: #DE071B; stroke-width: 10;' },
        serious:  { icon: '🟢', style: 'fill: #42C600; fill-opacity: 0; stroke: #42C600; stroke-width: 7;' },
        moderate: { icon: '🟣', style: 'fill: #886DE7; fill-opacity: 0.3; stroke: #886DE7; stroke-width: 6; stroke-dasharray: 5,3;' },
        minor:    { icon: '🔵', style: 'fill: #4598FF; fill-opacity: 0; stroke: #4598FF; stroke-width: 14; ' },
        fixme:    { icon: '🪓' }
    }

    cy.checkAccessibility(null, { impactStyling: customImpactStyling, includedImpacts: ['critical', 'serious', 'moderate', 'minor'] })
  });
});