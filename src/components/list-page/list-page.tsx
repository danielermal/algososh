import React from "react";
import style from "./style.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { ILinkedItem } from "../../types/types";
import { IButtonsStatus } from "../../types/types";
import {
  defaultButtonsStatus,
  disabledButtonsStatus,
  LinkedList,
} from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [index, setIndex] = React.useState("");
  const [state, setState] = React.useState<ILinkedItem[]>([]);
  const [colorState, setColorState] = React.useState({
    index: 0,
    color: false,
  });
  const [moveIndex, setMoveIndex] = React.useState(-1);
  const [buttonsStatus, setButtonsStatus] =
    React.useState<IButtonsStatus>(defaultButtonsStatus);

  const linkedList = React.useMemo(() => {
    const list = new LinkedList<string>();
    list.append("0");
    list.append("34");
    list.append("8");
    list.append("1");
    setState([...list.print()]);
    return list;
  }, []);

  const changeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const changeIndex = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(evt.target.value);
  };

  const addAnimation = (index: number): void => {
    setTimeout(() => {
      setState([...linkedList.print()]);
      setColorState({ index: index, color: true });
      setTimeout(() => {
        setColorState({ index: index, color: false });
        setValue("");
        setButtonsStatus(defaultButtonsStatus);
      }, DELAY_IN_MS);
    }, DELAY_IN_MS);
  };

  const deleteAnimation = () => {
    setTimeout(() => {
      setState([...linkedList.print()]);
      setButtonsStatus(defaultButtonsStatus);
    }, DELAY_IN_MS);
  };

  const addInHead = () => {
    linkedList.prepend(value);
    const head = {
      ...state[0],
      up: (
        <Circle letter={value} state={ElementStates.Changing} isSmall={true} />
      ),
    };
    const arr = state.filter((item, index) => index !== 0);
    setState([head, ...arr]);
    setButtonsStatus({
      ...disabledButtonsStatus,
      addInHead: {
        disabled: false,
        loading: true,
      },
    });
    addAnimation(0);
  };

  const addInTail = () => {
    linkedList.append(value);
    const tail = {
      ...state[state.length - 1],
      up: (
        <Circle letter={value} state={ElementStates.Changing} isSmall={true} />
      ),
    };
    const arr = state.filter((item, index) => index !== state.length - 1);
    setState([...arr, tail]);
    setButtonsStatus({
      ...disabledButtonsStatus,
      addInTail: {
        disabled: false,
        loading: true,
      },
    });
    addAnimation(state.length);
  };

  const deleteInHead = () => {
    linkedList.deleteHead();
    setButtonsStatus({
      ...disabledButtonsStatus,
      deleteInHead: {
        disabled: false,
        loading: true,
      },
    });
    const head = {
      ...state[0],
      down: (
        <Circle
          letter={state[0].value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      ),
      value: "",
    };
    const list = [];
    for (let i of state) {
      if (state[0] !== i) {
        list.push(i);
      }
    }
    setState([head, ...list]);
    deleteAnimation();
  };

  const deleteInTail = () => {
    linkedList.deleteByIndex(state.length - 1);
    setButtonsStatus({
      ...disabledButtonsStatus,
      deleteInTail: {
        disabled: false,
        loading: true,
      },
    });
    const tail = {
      ...state[state.length - 1],
      down: (
        <Circle
          letter={state[state.length - 1].value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      ),
      value: "",
    };
    const list = [];
    for (let i of state) {
      if (state[state.length - 1] !== i) {
        list.push(i);
      }
    }
    setState([...list, tail]);
    deleteAnimation();
  };

  const addByIndex = () => {
    if (index === "0") {
      addInHead();
    }
    if (Number(index) >= state.length) {
      return;
    }
    setButtonsStatus({
      ...disabledButtonsStatus,
      addByIndex: {
        disabled: false,
        loading: true,
      },
    });
    linkedList.addByIndex(value, Number(index));
    let i = 0;
    let t = 0;
    function moving() {
      setTimeout(() => {
        t = DELAY_IN_MS;
        const arr = [];
        const item = {
          ...state[i],
          up: (
            <Circle
              letter={value}
              state={ElementStates.Changing}
              isSmall={true}
            />
          ),
        };
        for (let j of state) {
          arr.push(state[i] !== j ? j : item);
        }
        setState([...arr]);
        if (i < Number(index)) {
          setTimeout(() => {
            setMoveIndex(i - 1);
          }, DELAY_IN_MS);
        }
        i++;
        if (i <= Number(index) + 1) {
          moving();
        } else {
          setState([...linkedList.print()]);
          setColorState({ index: i - 2, color: true });
          setMoveIndex(-1);
          setTimeout(() => {
            setColorState({ index: i - 2, color: false });
            setButtonsStatus(defaultButtonsStatus);
            setValue("");
            setIndex("");
          }, DELAY_IN_MS);
        }
      }, t);
    }
    moving();
  };

  const removeByIndex = () => {
    if (index === "0") {
      deleteInHead();
    }
    if (Number(index) >= state.length) {
      return;
    }
    setButtonsStatus({
      ...disabledButtonsStatus,
      deleteByIndex: {
        disabled: false,
        loading: true,
      },
    });
    linkedList.deleteByIndex(Number(index));
    let i = 0;
    setMoveIndex(i);
    function moving() {
      setTimeout(() => {
        setMoveIndex(i + 1);
        i++;
        if (i <= Number(index) - 1) {
          moving();
        } else {
          setTimeout(() => {
            const arr = [];
            const item = {
              ...state[i - 1],
              down: (
                <Circle
                  letter={state[i].value}
                  state={ElementStates.Changing}
                  isSmall={true}
                />
              ),
              value: "",
              next: Number(index) === state.length - 1 ? false : true,
            };
            for (let j of state) {
              arr.push(state[i] !== j ? j : item);
            }
            setState([...arr]);
            setMoveIndex(i - 1);
            setTimeout(() => {
              setState([...linkedList.print()]);
              setButtonsStatus(defaultButtonsStatus);
              setMoveIndex(-1);
              setValue("");
              setIndex("");
            }, DELAY_IN_MS);
          }, DELAY_IN_MS);
        }
      }, DELAY_IN_MS);
    }
    moving();
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={style.form}>
        <fieldset className={style.fieldset}>
          <Input
            type="text"
            placeholder="Введите значение"
            maxLength={4}
            isLimitText={true}
            extraClass={style.input}
            onChange={changeValue}
            value={value}
            name={"list"}
          />
          <Button
            linkedList="small"
            text="Добавить в head"
            type="button"
            onClick={addInHead}
            disabled={!(value.length > 0) || buttonsStatus.addInHead.disabled}
            isLoader={buttonsStatus.addInHead.loading}
          />
          <Button
            linkedList="small"
            text="Добавить в tail"
            type="button"
            onClick={addInTail}
            disabled={!(value.length > 0) || buttonsStatus.addInTail.disabled}
            isLoader={buttonsStatus.addInTail.loading}
          />
          <Button
            linkedList="small"
            text="Удалить из head"
            type="button"
            onClick={deleteInHead}
            disabled={buttonsStatus.deleteInHead.disabled}
            isLoader={buttonsStatus.deleteInHead.loading}
          />
          <Button
            linkedList="small"
            text="Удалить из tail"
            type="button"
            onClick={deleteInTail}
            disabled={buttonsStatus.deleteInTail.disabled}
            isLoader={buttonsStatus.deleteInTail.loading}
          />
        </fieldset>
        <fieldset className={style.fieldset}>
          <Input
            type="number"
            placeholder="Введите индекс"
            extraClass={style.input}
            onChange={changeIndex}
            max={state.length - 1}
            value={index}
            isLimitText={true}
            name={"index"}
          />
          <Button
            linkedList="big"
            text="Добавить по индексу"
            type="button"
            onClick={addByIndex}
            disabled={
              !(index.length > 0 && value.length > 0) ||
              buttonsStatus.addByIndex.disabled
            }
            isLoader={buttonsStatus.addByIndex.loading}
          />
          <Button
            linkedList="big"
            text="Удалить по индексу"
            type="button"
            onClick={removeByIndex}
            disabled={
              !(index.length > 0) || buttonsStatus.deleteByIndex.disabled
            }
            isLoader={buttonsStatus.deleteByIndex.loading}
          />
        </fieldset>
      </form>
      <div className={style.circle_container}>
        {state.map((item, index) => (
          <div className={style.element} key={index}>
            <Circle
              letter={item.value}
              index={index}
              head={item.up ? item.up : index === 0 ? "head" : ""}
              tail={
                item.down ? item.down : index === state.length - 1 ? "tail" : ""
              }
              state={
                index === colorState.index && colorState.color
                  ? ElementStates.Modified
                  : index <= moveIndex
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
            {item.next && <ArrowIcon />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
