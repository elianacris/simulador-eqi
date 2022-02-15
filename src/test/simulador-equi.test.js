import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentMapper from '@data-driven-forms/mui-component-mapper/component-mapper';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';

describe('My first Test', () => {
  /**
   * Mocking a validation endpoint
   */
  const validate = (value) =>
    new Promise((res, rej) => {
      return value === 'John' ? res('Validation sucesfull') : rej('Only value John is allowed');
    });

  /**
   * Create submit spy
   */
  const submitSpy = jest.fn();

  /**
   * example of form schema
   */
  const schema = {
    fields: [
      {
        component: 'text-field',
        name: '',
        label: 'name',
        isRequired: true,
        validate: [{ type: 'required', message: 'Username is required' }],
        inputProps: { 'aria-label': 'Username field' },
      },
      {
        component: 'text-field',
        name: 'enable-emails',
        label: 'Do you wish to receive promotinal emails?',
        inputProps: { 'aria-label': 'Enable emails' },
      },
      {
        component: 'text-field',
        name: 'email',
        type: 'email',
        label: 'Email adress',
        condition: {
          when: 'enable-emails',
          is: true,
        },
        validate: [validate, { type: 'required' }], // validation will be run immediatelly after the component is mounted and after changes
        inputProps: { 'aria-label': 'Email field' },
      },
    ],
  };

  it('should validate and submit the form', async () => {
    /**
     * we will be using render because we will need the DOM updates
     */
    render(<FormRenderer onSubmit={submitSpy} componentMapper={componentMapper} FormTemplate={FormTemplate} schema={schema} />);

    /**
     * we can try submit the form when the validation is not met
     */
    userEvent.click(screen.getByText('Submit'));
    expect(submitSpy).not.toHaveBeenCalled(); // true

    /**
     * fill the user name to pass the validation
     */
    userEvent.type(screen.getByLabelText('Username field'), 'John');

    userEvent.click(screen.getByText('Submit'));

    /**
     * first argument are the values and the second one is formApi
     */
    expect(submitSpy).toHaveBeenLastCalledWith({ username: 'John' }, expect.any(Object), expect.any(Function)); // true
    submitSpy.mockReset();
    /**
     * now lets check the email subscription
     */
    expect(() => screen.getByLabelText('Email field')).toThrow();

    userEvent.click(screen.getByLabelText('Enable emails'));

    userEvent.click(screen.getByText('Submit'), undefined, { skipPointerEventsCheck: true });
    expect(submitSpy).not.toHaveBeenCalled(); // true

    /**
     * field should be in error state
     * we only allow value of John
     */
    userEvent.type(screen.getByLabelText('Email field'), 'Marty');
    userEvent.click(screen.getByText('Submit'), undefined, { skipPointerEventsCheck: true });
    await waitFor(() => expect(screen.getByLabelText('Email field')).toBeInvalid());
    /**
     * set value to John and submit the form
     */
    userEvent.type(screen.getByLabelText('Email field'), '{selectall}{backspace}John');
    await waitFor(() => expect(screen.getByLabelText('Email field')).toHaveAttribute('aria-invalid', 'false'));

    userEvent.click(screen.getByText('Submit'));
    await waitFor(() =>
      expect(submitSpy).toHaveBeenCalledWith(
        {
          email: 'John',
          username: 'John',
          'enable-emails': true,
        },
        expect.any(Object),
        expect.any(Function)
      )
    ); // true
  });
});
