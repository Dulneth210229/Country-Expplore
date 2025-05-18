import React from "react";
import { render, screen } from "@testing-library/react";
import CountryCard from "../../components/CountryCard";

describe("CountryCard", () => {
  test("renders CountryCard component", () => {
    render(<CountryCard name="Test Country" />);
    const countryElement = screen.getByText(/Test Country/i);
    expect(countryElement).toBeInTheDocument();
  });

  test("displays correct information", () => {
    render(<CountryCard name="Test Country" population={1000000} />);
    const populationElement = screen.getByText(/Population: 1000000/i);
    expect(populationElement).toBeInTheDocument();
  });

  test("handles click event", () => {
    const handleClick = jest.fn();
    render(<CountryCard name="Test Country" onClick={handleClick} />);
    const countryElement = screen.getByText(/Test Country/i);
    countryElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
