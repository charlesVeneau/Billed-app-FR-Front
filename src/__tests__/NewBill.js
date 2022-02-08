/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import NewBillUI from '../views/NewBillUI.js'
import NewBill from '../containers/NewBill.js'
import { localStorageMock } from '../__mocks__/localStorage.js'
import { ROUTES } from '../constants/routes'
import { bills } from '../fixtures/bills'

let currentNewBill

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })
  window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
  const html = NewBillUI()
  document.body.innerHTML = html
  const onNavigate = (pathname) => {
    document.body.innerHTML = ROUTES({ pathname })
  }
  const store = null
  currentNewBill = new NewBill({
    document,
    onNavigate,
    store,
    localStorage: window.localStorage,
  })
})

describe('Given I am connected as an employee', () => {
  describe('When I am on NewBill Page', () => {
    test('Then the title of the page is set', () => {
      expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
      //to-do write assertion
    })
    //test the file input to see if it handles jpg file
    //mock the handleChangeFile method
    //set a jpeg file as the input target
    //see if there is a window alert
    test('Then I can select an image file, jpg, jpeg or png', () => {
      const handleChangeFile = jest.fn((e) =>
        currentNewBill.handleChangeFile(e)
      )
      const selectFile = screen.getByTestId('file')
      const testFile = new File(['This is a test'], 'test.png', {
        type: 'image/png',
      })
      selectFile.addEventListener('change', handleChangeFile)
      userEvent.upload(selectFile, testFile)
      console.log(selectFile.files[0])
      expect(selectFile).toBeTruthy()
    })
    test("Then I can't select a pdf file", () => {})
  })
})
