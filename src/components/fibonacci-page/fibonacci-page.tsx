import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from '../string/style.module.css'

export const FibonacciPage: React.FC = () => {

  const [value, setValue] = React.useState(0)
  const [fibArr, setFibArr] = React.useState<number[]>([])

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setFibArr([1])
    fibonacci(value)
  }

  const fibonacci = (n: number): void => {
    let arr = [0, 1]
    for (let i = 2, t = 500; i <= n + 1; i++){
      t+=500
      arr.push(arr[i - 2] + arr[i -1])
      setTimeout((fibArr: number[]) => {
        setFibArr(prevState => [...prevState, arr[i]])
      }, t)
    }
  }
  
  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.target.value)
    setValue(value)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={submitHandler}>
          <Input type="number" extraClass={style.input} max={19} isLimitText={true} onChange={changeHandler} placeholder='Введите число' />
        <Button type="submit" text="Рассчитать" disabled={!(value > 0 && value <= 19)} />
      </form>
      <div className={`${style.circle_container} ${style.circle_container_fib}`}>
        {fibArr.map((item, index) => {
          return <Circle letter={item + ''} key={index} index={index} />
        })}
      </div>
    </SolutionLayout>
  );
};
