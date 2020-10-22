// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import { shallow, mount } from "enzyme";
import Title from "./Title";

it("renders correctly", () => {
  const wrapper = mount(<Title />);
  expect(wrapper.state("error")).toEqual(null);
});
