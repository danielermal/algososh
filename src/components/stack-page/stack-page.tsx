import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import style from "../string/style.module.css";

export const StackPage: React.FC = () => {
  const [state, setState] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [color, setColor] = React.useState(false);

  const stack = React.useMemo(() => {
    return new Stack<string>();
  }, []);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const addElement = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    stack.push(inputValue);
    const resetForm = evt.target as HTMLFormElement;
    resetForm.reset();
    setInputValue("");
    setState([...stack.elements()]);
    setColor(true);
    setTimeout(() => {
      setColor(false);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteElement = () => {
    setColor(true);
    setTimeout(() => {
      stack.pop();
      setState([...stack.elements()]);
      setColor(false);
    }, SHORT_DELAY_IN_MS);
  };

  const clearStack = () => {
    stack.clear();
    setState([]);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={style.form} onSubmit={addElement}>
        <Input
          extraClass={style.input}
          minLength={1}
          maxLength={4}
          isLimitText={true}
          placeholder="Введите текст"
          onChange={handleChange}
        />
        <Button
          text="Добавить"
          type="submit"
          disabled={!(inputValue.length > 0)}
        />
        <Button
          text="Удалить"
          type="button"
          disabled={!(state.length > 0)}
          onClick={deleteElement}
        />
        <Button
          text="Очистить"
          extraClass={style.button_clear}
          type="button"
          onClick={clearStack}
          disabled={!(state.length > 0)}
        />
      </form>
      <div
        className={`${style.circle_container} ${style.circle_container_fib}`}
      >
        {state.map((item, index) => (
          <Circle
            letter={item}
            index={index}
            key={index}
            head={index === state.length - 1 ? "top" : ""}
            state={
              index === state.length - 1 && color
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
