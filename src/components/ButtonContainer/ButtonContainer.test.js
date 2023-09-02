import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonContainer from './ButtonContainer';

describe('ButtonContainer Component', () => {
  it('renders save and reset buttons', () => {
    render(<ButtonContainer setReload={() => {}} onTreeSave={() => {}} />);
    const saveButton = screen.getByText('Save');
    const resetButton = screen.getByText('Reset');
    expect(saveButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it('triggers the onTreeSave function when Save button is clicked', () => {
    const onTreeSaveMock = jest.fn();
    render(
      <ButtonContainer setReload={() => {}} onTreeSave={onTreeSaveMock} />
    );
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(onTreeSaveMock).toHaveBeenCalledTimes(1);
  });

  it('triggers the setReload function when Reset button is clicked', () => {
    const setReloadMock = jest.fn();
    render(<ButtonContainer setReload={setReloadMock} onTreeSave={() => {}} />);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    expect(setReloadMock).toHaveBeenCalledTimes(1);
  });
});
