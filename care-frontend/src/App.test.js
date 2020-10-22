import React from "react";
import { shallow, mount } from "enzyme";
import Title from "./Title";

it("renders correctly", () => {
    const wrapper = mount(<Title />);
    expect(wrapper.state("error")).toEqual(null);
  });