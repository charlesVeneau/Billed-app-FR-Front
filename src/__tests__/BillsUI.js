/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/dom'
import BillsUI from '../views/BillsUI.js'
import { bills } from '../fixtures/bills.js'
import { localStorageMock } from '../__mocks__/localStorage.js'
import { ROUTES_PATH } from '../constants/routes'
import Router from '../app/Router.js'

describe('Given I am connected as an employee', () => {
  describe('When I am on Bills Page', () => {
    test('Then bill icon in vertical layout should be highlighted', async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      const user = JSON.stringify({
        type: 'Employee',
      })
      window.localStorage.setItem('user', user)

      Object.defineProperty(window, 'location', {
        value: {
          hash: ROUTES_PATH['Bills'],
        },
      })
      document.body.innerHTML = `<div id="root"></div>`
      await Router()
      expect(
        screen.getByTestId('icon-window').classList.contains('active-icon')
      ).toBeTruthy()
    })
    test('Then bills should be ordered from earliest to latest', () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen
        .getAllByText(
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
        )
        .map((a) => a.innerHTML)
      const antiChrono = (a, b) => (a < b ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })
  describe('When LoadingPage is called', () => {
    test('Then, it should render Loading...', () => {
      const loading = true
      const html = BillsUI({ data: [], loading })
      document.body.innerHTML = html
      expect(screen.getAllByText('Loading...')).toBeTruthy()
    })
  })
  describe('When an error occurs', () => {
    test('Then, it should render an error message', () => {
      const error = true
      const html = BillsUI({ data: [], error })
      document.body.innerHTML = html
      expect(screen.getAllByText('Erreur')).toBeTruthy()
    })
  })
})
