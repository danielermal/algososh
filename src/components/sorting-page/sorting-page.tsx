import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import style from "../string/style.module.css";
import sortStyle from "./sort-style.module.css";

export const SortingPage: React.FC = () => {

  const [state, setState] = React.useState<number[]>([])

  const changeSort = () => {

  }

  function getRandom(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const newArray = () => {
    const length = getRandom(3, 17)
    const arr = Array.from<string | number>('0'.repeat(length)).map(item => item = getRandom(0, 100))
    setState([...arr])
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={style.form}>
        <fieldset className={style.radio_container}>
          <RadioInput label="Выбор" checked={true} name="sort" onChange={changeSort} />
          <RadioInput label="Пузырек" name="sort" onChange={changeSort} />
        </fieldset>
        <Button
          sorting={Direction.Ascending}
          text="По возрастанию"
          extraClass={sortStyle.button}
          type="submit"
        />
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          extraClass={sortStyle.button}
          type="submit"
        />
        <Button
          text="Новый массив"
          extraClass={sortStyle.button_new}
          type="button"
          onClick={newArray}
        />
      </form>
      <div className={sortStyle.column_container}>
        {state.map((item, index) => 
          <Column index={item} key={index} />
        )}
      </div>
    </SolutionLayout>
  );
};
