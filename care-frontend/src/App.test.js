import React from "react";
import { shallow, mount } from "enzyme";
import Account from "./Account";
import App from "./App";
import toJson from "enzyme-to-json";

it("renders without crashing", () => {
    shallow(<Title />);
  });
  
  it("renders Account header", () => {
    const wrapper = shallow(<Title />);
    const welcome = <h5>Frequently Asked Questions</h5>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });