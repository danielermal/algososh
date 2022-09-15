import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fibonacci } from "./utils";
import style from "../string/style.module.css";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [fibArr, setFibArr] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(false);
  const minValue = 1
  const maxValue = 19

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);
    setFibArr([])
    const fibArr = fibonacci(value);
    visualVibArr(fibArr)
  };

  const visualVibArr = (arr: number[]): void => {
    let i = 0
    let t = 0
    function recursion () {
      setTimeout(() => {
        if (i >= arr.length) {
          setLoading(false)
          return
        }
        else {
          setFibArr(prev => [...prev, arr[i]])
          i++
          t+=500
          recursion()
        }
      }, 500)
    }
    recursion()
  }

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.target.value);
    setValue(value);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={submitHandler}>
        <Input
          type="number"
          extraClass={style.input}
          max={19}
          isLimitText={true}
          onChange={changeHandler}
          placeholder="Введите число"
        />
        <Button
          type="submit"
          text="Рассчитать"
          disabled={!(value >= minValue && value <= maxValue)}
          isLoader={loading}
        />
      </form>
      <div
        className={`${style.circle_container} ${style.circle_container_fib}`}
      >
        {fibArr.map((item, index) => {
          return <Circle letter={item.toString()} key={index} index={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
