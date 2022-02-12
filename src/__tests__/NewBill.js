/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import NewBillUI from '../views/NewBillUI.js'
import NewBill from '../containers/NewBill.js'
import { localStorageMock } from '../__mocks__/localStorage.js'
import { ROUTES } from '../constants/routes'
import { bills } from '../fixtures/bills'
import { store } from '../__mocks__/store'

// let currentNewBill

/* beforeParse((window) => {
  window.alert = window.console.log.bind(window.console)
}) */

/* beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })
  window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
  const html = NewBillUI()
  document.body.innerHTML = html
  const onNavigate = (pathname) => {
    document.body.innerHTML = ROUTES({ pathname })
  }
  // const store = this.store
  currentNewBill = new NewBill({
    document,
    onNavigate,
    store,
    localStorage: window.localStorage,
  })
  window.alert = jest.fn()
}) */

describe('Given I am connected as an employee', () => {
  describe('When I am on NewBill Page', () => {
    test('Then the form is displayed', () => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      })
      window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
      const html = NewBillUI()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      // const store = this.store
      const currentNewBill = new NewBill({
        document,
        onNavigate,
        store,
        localStorage: window.localStorage,
      })
      expect(screen.getByTestId('form-new-bill')).toBeTruthy()
    })

    //test the file input to see if it handles jpg file
    //mock the handleChangeFile method
    //set a jpeg file as the input target
    //see if there is a window alert
    test.only('Then I can select an image file, jpg, jpeg or png', async () => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      })
      window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
      const html = NewBillUI()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      // const store = this.store
      const currentNewBill = new NewBill({
        document,
        onNavigate,
        store,
        localStorage: window.localStorage,
      })
      // window.alert = jest.fn()
      jest.spyOn(window, 'alert').mockImplementation(() => {})
      const handleChangeFile = jest.fn((e) =>
        currentNewBill.handleChangeFile(e)
      )
      const selectFile = screen.getByTestId('file')
      const testFile = new File(['This is a test'], 'test.jpg', {
        type: 'image/jpeg',
      })

      selectFile.addEventListener('change', handleChangeFile)
      await waitFor(() => {
        userEvent.upload(selectFile, testFile)
      })
      console.log(selectFile.files[0].name)
      expect(handleChangeFile).toHaveBeenCalled()
      expect(selectFile.files[0]).toStrictEqual(testFile)
      expect(window.alert).not.toHaveBeenCalled()
      /*window.alert.mockClear()  */
    })
    test('Then I can submit the form', async () => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      })
      window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
      const html = NewBillUI()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      // const store = this.store
      const currentNewBill = new NewBill({
        document,
        onNavigate,
        store,
        localStorage: window.localStorage,
      })
      // window.alert = jest.fn()
      const formNewBill = screen.getByTestId('form-new-bill')
      const handleSubmit = jest.fn((e) => {
        currentNewBill.handleSubmit(e)
      })
      const handleChangeFile = jest.fn((e) =>
        currentNewBill.handleChangeFile(e)
      )
      const selectFile = screen.getByTestId('file')
      const testFile = new File(['This is a test'], 'test.jpg', {
        type: 'image/jpeg',
      })
      selectFile.addEventListener('change', handleChangeFile)
      await waitFor(() => {
        userEvent.upload(selectFile, testFile)
      })
      formNewBill.addEventListener('submit', handleSubmit)
      fireEvent.submit(formNewBill)
      expect(handleChangeFile).toHaveBeenCalled()
      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})
