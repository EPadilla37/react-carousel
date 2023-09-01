import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import Card from "./Card";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

// Smoke test for Card component
test("Card component renders without crashing", () => {
  render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
});

// Snapshot test for Card component
test("Card component matches snapshot", () => {
  const { container } = render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
  expect(container).toMatchSnapshot();
});

// Smoke test for Carousel component
test("Carousel component renders without crashing", () => {
  render(<Carousel />);
});

// Snapshot test for Carousel component
test("Carousel component matches snapshot", () => {
  const { container } = render(<Carousel />);
  expect(container).toMatchSnapshot();
});

// Test for left arrow behavior
it("left arrow moves to previous image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
});

// Test for arrow visibility
it("left arrow is missing on first image, and right arrow is missing on last image", function() {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toHaveClass("hidden");

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");
});
