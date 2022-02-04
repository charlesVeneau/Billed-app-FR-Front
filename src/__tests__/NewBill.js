/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/dom'
import NewBillUI from '../views/NewBillUI.js'
import NewBill from '../containers/NewBill.js'

describe('Given I am connected as an employee', () => {
  describe('When I am on NewBill Page', () => {
    test('Then the title of the page is Envoyer une note de frais', () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
      //to-do write assertion
    })
    //check if the page is loaded
    //check if you can add a jpg file
    //check if you can't add a pdf file
    //On submit of the form the bills page is loaded
  })
})
