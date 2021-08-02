import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import {TextToSpeechForm} from 'sections/text-to-speech'

describe('Test application form', () => {
  test('submitting the form calls onSubmit with inserted text', () => {
    const handleSubmit = jest.fn()
    render(<TextToSpeechForm onSubmit={handleSubmit} buttonText="play" />)
    const textAreaField = screen.getByLabelText(
      /Use the sample text or enter your own text in English/i,
    )
    const play = screen.getByRole('button', {name: /play/i})
    const fakeText = faker.random.words(2)

    userEvent.type(textAreaField, fakeText)
    userEvent.click(play)
    expect(handleSubmit).toHaveBeenCalledWith(fakeText.trim().toLowerCase())
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  test('submitting the form without text displays validation message', () => {
    const handleSubmit = jest.fn()
    render(<TextToSpeechForm onSubmit={handleSubmit} buttonText="play" />)
    const play = screen.getByRole('button', {name: /play/i})

    userEvent.click(play)
    expect(
      screen.getByText(/Please, enter some text to convert to speech/i),
    ).toBeInTheDocument()
  })

  test('Typing more than 50 characters displays validation message', () => {
    const handleSubmit = jest.fn()
    render(<TextToSpeechForm onSubmit={handleSubmit} buttonText="play" />)
    const textAreaField = screen.getByLabelText(
      /Use the sample text or enter your own text in English/i,
    )
    const fakeText = faker.random.words(15)

    userEvent.type(textAreaField, fakeText)
    expect(
      screen.getByText(/Maximum text length allowed is 50 characters/i),
    ).toBeInTheDocument()
  })
})
