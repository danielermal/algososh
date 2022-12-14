import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { IButtonsStatusSort } from "../../types/types";
import { defaultButtonsStatusSort, disabledButtonsStatusSort, currentButtonsStatusSort, selectionSortUp, selectionSortDown, bubbleSortUp, bubbleSortDown } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import style from "../string/style.module.css";
import sortStyle from "./sort-style.module.css";

export const SortingPage: React.FC = () => {
  const [state, setState] = React.useState<number[]>([]);
  const [sortNumber, setSortNumber] = React.useState<number>(-2);
  const [bubble, setBubble] = React.useState(false);
  const [nextNumber, setNextNumber] = React.useState<number>(-2);
  const [buttonsStatus, setButtonsStatus] = React.useState<IButtonsStatusSort>(
    defaultButtonsStatusSort
  );

  const minusSort = () => {
    setButtonsStatus({
      ...disabledButtonsStatusSort,
      ascendingSort: {
        disabled: false,
        loading: true,
      },
    });
    bubble ? ascendingSortBubble([...state]) : ascendingSort([...state]);
  };

  const plusSort = () => {
    setButtonsStatus({
      ...disabledButtonsStatusSort,
      descendingSort: {
        disabled: false,
        loading: true,
      },
    });
    bubble ? descendingSortBubble([...state]) : descendingSort([...state]);
  };

  React.useEffect(() => {
    if (bubble) return;
    if (sortNumber >= 0) {
      let value = sortNumber;
      setInterval(() => {
        if (value < state.length - 1) {
          value++;
          setNextNumber(value);
        }
      }, SHORT_DELAY_IN_MS);
      if (sortNumber === state.length - 2 && nextNumber === state.length - 1) {
        setTimeout(() => {
          setNextNumber(state.length);
          setSortNumber(state.length);
        }, 1500);
      }
    }
  }, [sortNumber]);

  React.useEffect(() => {
    if (!bubble) return;
    if (sortNumber >= 0 && sortNumber < state.length) {
      let value = 0;
      setInterval(() => {
        if (value < nextNumber) {
          value++;
          setSortNumber(value);
        }
      }, SHORT_DELAY_IN_MS);
    } else {
      setNextNumber(20);
    }
  }, [nextNumber, bubble]);

  const swap = (
    arr: number[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    setState((prevState) => [...arr]);
  };
  

  const ascendingSort = (arr: number[]) => {
    let i = 0;
    let t = SHORT_DELAY_IN_MS * arr.length;
    const sortArr = selectionSortUp([...arr])
    function sort() {
      setSortNumber(i);      
      setTimeout(() => {
        let minInd = i;
        t = SHORT_DELAY_IN_MS * (arr.length - i);
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[minInd] > arr[j]) {
            minInd = j;
          }
        }
        if (minInd !== i) {
          swap(arr, i, minInd);
        }
        i++;
        if (i < arr.length - 1) {
          sort();
        } else {
          setState(sortArr)
          setButtonsStatus(currentButtonsStatusSort);
        }
      }, t);
    }
    sort();
  };

  const descendingSort = (arr: number[]) => {
    let i = 0;
    let t = SHORT_DELAY_IN_MS * arr.length;
    const sortArr = selectionSortDown([...arr])
    function sort() {
      setSortNumber(i);
      setTimeout(() => {
        let maxInd = i;
        t = SHORT_DELAY_IN_MS * (arr.length - i);
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[maxInd] < arr[j]) {
            maxInd = j;
          }
        }
        if (maxInd !== i) {
          swap(arr, i, maxInd);
        }
        i++;
        if (i < arr.length - 1) {
          sort();
        } else {
          setState(sortArr)
          setButtonsStatus(currentButtonsStatusSort);
        }
      }, t);
    }
    sort();
  };

  const ascendingSortBubble = (arr: number[]) => {
    let i = 0;
    let t = SHORT_DELAY_IN_MS * arr.length;
    const sortArr = bubbleSortUp([...arr])
    function sort() {
      setSortNumber(0);
      setNextNumber(arr.length - i - 2);
      setTimeout(() => {
        t = SHORT_DELAY_IN_MS * (arr.length - i);
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            swap(arr, j, j + 1);
            swapped = true;
          }
        }
        if (!swapped) {
          setState(sortArr)
          setNextNumber(-2);
          setSortNumber(-2);
          setButtonsStatus(currentButtonsStatusSort);
          return;
        }
        i++;
        if (i < arr.length - 1) {
          sort();
        } else {
          setState(sortArr)
          setNextNumber(-2);
          setSortNumber(-2);
          setButtonsStatus(currentButtonsStatusSort);
        }
      }, t);
    }
    sort();
  };

  const descendingSortBubble = (arr: number[]) => {
    let i = 0;
    let t = SHORT_DELAY_IN_MS * arr.length;
    const sortArr = bubbleSortDown([...arr])
    function sort() {
      setSortNumber(0);
      setNextNumber(arr.length - i - 2);
      setTimeout(() => {
        t = SHORT_DELAY_IN_MS * (arr.length - i);
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] < arr[j + 1]) {
            swap(arr, j, j + 1);
            swapped = true;
          }
        }
        if (!swapped) {
          setState(sortArr)
          setNextNumber(-2);
          setSortNumber(-2);
          setButtonsStatus(currentButtonsStatusSort);
          return;
        }
        i++;
        if (i < arr.length - 1) {
          sort();
        } else {
          setState(sortArr)
          setNextNumber(-2);
          setSortNumber(-2);
          setButtonsStatus(currentButtonsStatusSort);
        }
      }, t);
    }
    sort();
  };

  const getRandom = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const newArray = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!bubble) {
      setSortNumber(-2);
      setNextNumber(-2);
    } else {
      setSortNumber(-2);
      setNextNumber(20);
    }
    setButtonsStatus(currentButtonsStatusSort);
    const length = getRandom(3, 17);
    const arr = Array.from<string | number>("0".repeat(length)).map(
      (item) => (item = getRandom(1, 100))
    );
    setState([...arr]);
  };

  const setColors = (index: number) => {
    return !bubble
      ? index < sortNumber
        ? ElementStates.Modified
        : index === sortNumber || index === nextNumber
        ? ElementStates.Changing
        : ElementStates.Default
      : index === sortNumber || index === sortNumber + 1
      ? ElementStates.Changing
      : index <= nextNumber + 1
      ? ElementStates.Default
      : ElementStates.Modified;
  };

  return (
    <SolutionLayout title="???????????????????? ??????????????">
      <form className={style.form} onSubmit={newArray}>
        <fieldset className={style.radio_container}>
          <RadioInput
            label="??????????"
            name="sort"
            disabled={buttonsStatus.newArray.disabled}
            onChange={() => setBubble(false)}
          />
          <RadioInput
            label="??????????????"
            name="sort"
            disabled={buttonsStatus.newArray.disabled}
            onChange={() => setBubble(true)}
          />
        </fieldset>
        <Button
          sorting={Direction.Ascending}
          text="???? ??????????????????????"
          extraClass={sortStyle.button}
          type="button"
          onClick={minusSort}
          isLoader={buttonsStatus.ascendingSort.loading}
          disabled={buttonsStatus.ascendingSort.disabled}
        />
        <Button
          sorting={Direction.Descending}
          text="???? ????????????????"
          extraClass={sortStyle.button}
          type="button"
          onClick={plusSort}
          isLoader={buttonsStatus.descendingSort.loading}
          disabled={buttonsStatus.descendingSort.disabled}
        />
        <Button
          text="?????????? ????????????"
          extraClass={sortStyle.button_new}
          type="submit"
          disabled={buttonsStatus.newArray.disabled}
        />
      </form>
      <div className={sortStyle.column_container}>
        {state.map((item, index) => (
          <Column index={item} key={index} state={setColors(index)} />
        ))}
      </div>
    </SolutionLayout>
  );
};
