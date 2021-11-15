import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
// import { prettyDOM } from "@testing-library/dom";
import Toggable from './Togglable'

describe('<Toggable />', () => {
  const buttonLabel = 'show'
  let component

  beforeEach(() => {
    component = render(
      <Toggable buttonLabel={buttonLabel}>
        <div>testDivContent</div>
      </Toggable>
    )
  })

  test('renders its children', () => {
    component.getByText('testDivContent')
  })

  test('renders its children but they are not visible', () => {
    const el = component.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('after clicking its children must be shown', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)
    const el = component.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')

    const cancelButton = component.getByText('Cancel')
    fireEvent.click(cancelButton)
    expect(el.parentNode).toHaveStyle('display: none')
  })
})
