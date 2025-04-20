import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";
import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays the dog image after fetching", async () => {
  render(<App />);
  
  const img = await screen.findByAltText("A Random Dog");
  expect(img).toBeInTheDocument();
  expect(img.src).toContain("bulldog-english/mami.jpg");
});

test("displays a loading message before fetching", async () => {
  render(<App />);
  
  
  expect(screen.getByText(/Loading/)).toBeInTheDocument();
  
 
  await screen.findByAltText("A Random Dog");
  
  
  expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
});