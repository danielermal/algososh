import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from "./style.module.css";
import { MIN_VALUE, MAX_VALUE } from "./utils";
import { reverseString } from "./utils";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [state, setState] = React.useState<string[]>([]);
  const [indexes, setIndexes] = React.useState({
    start: MIN_VALUE,
    end: MAX_VALUE,
    loading: false,
  });

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIndexes({ ...indexes, start: MIN_VALUE, end: MAX_VALUE, loading: true });
    let start = 0;
    let end = value.length - 1;
    let time = 1000;
    const arr = [...value];
    setState(arr);
    const reverseArr = [...reverseString(value)]
    setTimeout(() => {
      while (start <= end) {
        swap(arr, reverseArr, start, end, time);
        start++;
        end--;
        time += 1000;
      }
    }, 1000);
  };

  const swap = (
    arr: string[],
    reverseArr: string[],
    firstIndex: number,
    secondIndex: number,
    time: number
  ): void => {
    setTimeout(() => {
      arr[firstIndex] = reverseArr[firstIndex];
      arr[secondIndex] = reverseArr[secondIndex];
      setIndexes({
        ...indexes,
        start: firstIndex + 1,
        end: secondIndex - 1,
        loading: true,
      });
      if (firstIndex + 1 === secondIndex || firstIndex === secondIndex) {
        setIndexes({ ...indexes, start: MAX_VALUE, end: MIN_VALUE, loading: false });
        setValue("")
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
          value={value}
          name={"string"}
        />
        <Button
          type="submit"
          text="Развернуть"
          disabled={!(value.length > 0)}
          isLoader={indexes.loading}
        />
      </form>
      <div className={style.circle_container} >
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
