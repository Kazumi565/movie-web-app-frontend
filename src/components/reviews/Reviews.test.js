import { useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import api from '../../api/axiosConfig';
import Reviews from './Reviews';

jest.mock('../../api/axiosConfig', () => ({ post: jest.fn() }));

const getMovieData = jest.fn();

function TestPage() {
  const [reviews, setReviews] = useState([{ body: 'Existing review' }]);
  return <Reviews getMovieData={getMovieData} movie={{ title: 'Test movie' }} reviews={reviews} setReviews={setReviews} />;
}

function openReviews() {
  return render(
    <MemoryRouter initialEntries={['/Reviews/tt1234567']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes><Route path="/Reviews/:movieId" element={<TestPage />} /></Routes>
    </MemoryRouter>
  );
}

beforeEach(() => jest.clearAllMocks());

test('keeps the draft and shows a useful error after a failed save', async () => {
  api.post.mockRejectedValueOnce(new Error('offline'));
  openReviews();
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'My review' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('could not be saved');
  expect(screen.getByRole('textbox')).toHaveValue('My review');
  expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
});

test('shows the saved server review and prevents duplicate pending submissions', async () => {
  let finish;
  api.post.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
  openReviews();
  fireEvent.change(screen.getByRole('textbox'), { target: { value: ' A review ' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled();
  expect(screen.getByRole('textbox')).toBeDisabled();
  fireEvent.submit(screen.getByRole('textbox').closest('form'));
  expect(api.post).toHaveBeenCalledTimes(1);
  expect(api.post).toHaveBeenCalledWith('/api/v1/reviews', { reviewBody: 'A review', imdbId: 'tt1234567' });

  await act(async () => finish({ data: { body: 'Saved review from server' } }));
  expect(screen.getByText('Existing review')).toBeInTheDocument();
  expect(screen.getByText('Saved review from server')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue(''));
});

test('rejects a whitespace-only review without calling the API', () => {
  openReviews();
  fireEvent.change(screen.getByRole('textbox'), { target: { value: '   ' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Write a review');
  expect(api.post).not.toHaveBeenCalled();
});
