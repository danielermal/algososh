import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import style from "../string/style.module.css";

export const QueuePage: React.FC = () => {
  const [state, setState] = React.useState<(string | null)[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [color, setColor] = React.useState({ head: false, tail: false });

  const queue = React.useMemo(() => {
    const queue = new Queue<string>(7);
    setState([...queue.elements()]);
    return queue;
  }, []);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const addElement = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    queue.enqueue(inputValue);
    const resetForm = evt.target as HTMLFormElement;
    resetForm.reset();
    setInputValue("");
    setState([...queue.elements()]);
    setColor({ ...color, tail: true });
    setTimeout(() => {
      setColor((prev) => ({ ...prev, tail: false }));
    }, SHORT_DELAY_IN_MS);
  };

  const deleteElement = () => {
    setColor({ ...color, head: true });
    setTimeout(() => {
      queue.dequeue();
      setState([...queue.elements()]);
      setColor((prev) => ({ ...prev, head: false }));
    }, SHORT_DELAY_IN_MS);
  };

  const clearStack = () => {
    queue.clear();
    setState([...queue.elements()]);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onSubmit={addElement}>
        <Input
          extraClass={style.input}
          minLength={1}
          maxLength={4}
          isLimitText={true}
          placeholder="Введите значение"
          onChange={handleChange}
          name="queue"
        />
        <Button
          text="Добавить"
          type="submit"
          disabled={!(inputValue.length > 0)}
        />
        <Button
          text="Удалить"
          type="button"
          disabled={queue.checkElements()}
          onClick={deleteElement}
        />
        <Button
          text="Очистить"
          extraClass={style.button_clear}
          type="button"
          onClick={clearStack}
          disabled={queue.isEmpty()}
        />
      </form>
      <div
        className={`${style.circle_container} ${style.circle_container_fib}`}
      >
        {state.map((item, index) => (
          <Circle
            letter={item ? item : ""}
            index={index}
            key={index}
            head={index === queue.head && state[index] ? "head" : ""}
            tail={index === queue.tail - 1 && state[index] ? "tail" : ""}
            state={
              (index === queue.head && color.head) ||
              (index === queue.tail - 1 && color.tail)
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
