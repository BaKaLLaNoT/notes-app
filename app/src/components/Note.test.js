import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
// import { prettyDOM } from "@testing-library/dom";
import Note from './Note'

describe('<Note />', () => {
  test('renders content', () => {
    const note = { content: 'This is a test', important: true }

    const component = render(<Note note={note} />)
    component.getByText('This is a test')
    component.getByText('make not important')
    // const el = component.getByText("This is a test");
    // expect(el).toBeDefined();
    // const li = component.container.querySelector("li");
    // console.log(prettyDOM(li));
    // expect(component.container).toHaveTextContent(note.content);
  })

  test('clicking the button calls event handler once', () => {
    const note = { content: 'This is a test', important: true }

    const mockHandler = jest.fn()

    const component = render(
      <Note note={note} toggleImportance={mockHandler} />
    )
    const button = component.getByText('make not important')
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
