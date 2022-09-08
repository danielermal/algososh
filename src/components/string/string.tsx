import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import style from "./style.module.css";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [state, setState] = React.useState<string[]>([]);
  const [indexes, setIndexes] = React.useState({
    start: -1,
    end: 99,
    loading: false,
  });

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIndexes({ ...indexes, start: -1, end: 99, loading: true });
    let start = 0;
    let end = value.length - 1;
    let time = 1000;
    const arr = [...value];
    setState(arr);
    setTimeout(() => {
      while (start <= end) {
        swap(arr, start, end, time);
        start++;
        end--;
        time += 1000;
      }
    }, 1000);
  };

  const swap = (
    arr: string[],
    firstIndex: number,
    secondIndex: number,
    time: number
  ): void => {
    setTimeout(() => {
      const temp = arr[firstIndex];
      arr[firstIndex] = arr[secondIndex];
      arr[secondIndex] = temp;
      setIndexes({
        ...indexes,
        start: firstIndex + 1,
        end: secondIndex - 1,
        loading: true,
      });
      if (firstIndex + 1 === secondIndex || firstIndex === secondIndex) {
        setIndexes({ ...indexes, start: 99, end: -1, loading: false });
      }
    }, time);
  };

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setValue(value);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={submitHandler}>
        <Input
          extraClass={style.input}
          minLength={1}
          maxLength={11}
          isLimitText={true}
          onChange={changeHandler}
        />
        <Button
          type="submit"
          text="Развернуть"
          disabled={!(value.length > 0)}
          isLoader={indexes.loading}
        />
      </form>
      <div className={style.circle_container}>
        {state.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item}
              state={
                index === indexes.start || index === indexes.end
                  ? ElementStates.Changing
                  : index > indexes.start && index < indexes.end
                  ? ElementStates.Default
                  : ElementStates.Modified
              }
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
