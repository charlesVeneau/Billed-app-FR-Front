/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import Bills from '../containers/Bills.js'
import BillsUI from '../views/BillsUI.js'
import { localStorageMock } from '../__mocks__/localStorage.js'
import { ROUTES } from '../constants/routes'
import store from '../__mocks__/store.js'
import { bills } from '../fixtures/bills'

let billsView

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })
  window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
  const html = BillsUI({ data: bills })
  document.body.innerHTML = html
  const onNavigate = (pathname) => {
    document.body.innerHTML = ROUTES({ pathname })
  }
  const store = null
  //Bootsrap mock to call the modal method of the handleClickIconEye function
  $.fn.modal = jest.fn()
  billsView = new Bills({
    document,
    onNavigate,
    store,
    localStorage: window.localStorage,
  })
})

// check if there is a new bill button and get to the new bill route
// check if there is an eye icon and show the preview modal
describe('Given I am connected as an employee and I am on Bills page', () => {
  describe('when I click  on the new bill button', () => {
    test('I should be sent to the new bill page', () => {
      //   const handleClickIconEye = jest.spyOn(billsView, 'handleClickIconEye')
      const handleClickNewBill = jest.fn(billsView.handleClickNewBill)
      const newBillButton = screen.getByTestId('btn-new-bill')
      newBillButton.addEventListener('click', handleClickNewBill())
      userEvent.click(newBillButton)
      //expect the handleClickNewBill to be called
      expect(handleClickNewBill).toHaveBeenCalled()
      //expect the route to be new bill
      expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
    })
  })
  //test('Then the new bill button should set the route to the new bill page', () => {})
  describe('When I click on the icon eye icon', () => {
    test('A modal should open', async () => {
      //   const handleClickIconEye = jest.spyOn(billsView, 'handleClickIconEye')
      const handleClickIconEye = jest.fn(billsView.handleClickIconEye)
      const eye = screen.getAllByTestId('icon-eye')[0]
      eye.addEventListener('click', handleClickIconEye(eye))
      userEvent.click(eye)
      const modale = screen.getAllByTestId('modaleFile')[0]
      expect(handleClickIconEye).toHaveBeenCalled()
      expect(modale.classList.contains('fade')).toBeTruthy()
      await waitFor(() => {
        //expect(modale.classList.contains('show')).toBeTruthy()
        console.log(modale.classList)
      })
    })
  })
})
