import React, { useMemo, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "../../constants/data-structures";
import { ElementStates } from "../../types/element-states";
import style from "../string/style.module.css";

export const QueuePage: React.FC = () => {
  const [state, setState] = React.useState<(string | null)[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [newStack, setnewStack] = React.useState(true);
  const [color, setColor] = React.useState({head: false, tail: false});

  let queue = React.useMemo(() => {
    const queue = new Queue<string>(7)
    setState([...queue.container])
    return queue
  }, [newStack]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const addElement = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    queue.enqueue(inputValue)
    const resetForm = evt.target as HTMLFormElement;
    resetForm.reset();
    setInputValue("");
    setState([...queue.container]);
    setColor({...color, tail: true});
    setTimeout(() => {
      setColor(prev => ({...prev, tail: false}));
    }, 500);
  };

  const deleteElement = () => {
    setColor({...color, head: true});
    setTimeout(() => {
      queue.dequeue();
      setState([...queue.container]);
      setColor(prev => ({...prev, head: false}));
    }, 500);
  };

  const clearStack = () => {
    setState([]);
    setnewStack(!newStack);
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
            letter={item ? item : ''}
            index={index}
            key={index}
            head={(index === queue.head && state[index]) ? "head" : ''}
            tail={(index === queue.tail - 1 && state[index]) ? "tail" : ''}
            state={((index === queue.head && color.head) || (index === queue.tail - 1 && color.tail)) ? ElementStates.Changing : ElementStates.Default}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
