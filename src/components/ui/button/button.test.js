import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

const onClick = () => {
  alert("На кнопку нажали!");
};

describe("Тестирование компонента Button", () => {
  it("кнопка с текстом", () => {
    const tree = renderer.create(<Button text="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("кнопка без текста", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("заблокированная кнопка", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("кнопка с загрузкой", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("нажатие на кнопку", () => {
    window.alert = jest.fn();
    render(<Button onClick={onClick} text={"Тыкни на меня"} />);
    const button = screen.getByText("Тыкни на меня");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("На кнопку нажали!");
  });
});
