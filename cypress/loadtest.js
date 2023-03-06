import { check, sleep } from 'k6';

export let options = {
  vus: 100,
  duration: '10s',
  rps: 1000,
};

export default function() {
  // generate random date values
  let day = Math.floor(Math.random() * 31) + 1;
  let month = Math.floor(Math.random() * 12) + 1;
  let year = Math.floor(Math.random() * 100) + 1920;

  // visit the website and interact with the form
  cy.visit('https://datetime-checker.onrender.com/');
  cy.get('#txtDay').type(day);
  cy.get('#txtMonth').type(month);
  cy.get('#txtYear').type(year);
  cy.get('#btCheck').click();

  // clear the input
  cy.get('#btClear').click();

  // sleep for 1 second
  sleep(1);
}
