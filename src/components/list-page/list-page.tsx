import React from "react";
import style from "./style.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "../../constants/data-structures";
import { ElementStates } from "../../types/element-states";
import { ILinkedItem } from "../../constants/data-structures";
import { Circle } from "../ui/circle/circle";

interface IButtonsStatus {
  addInHead: {
    disabled: boolean;
    loading: boolean
  };
  addInTail: {
    disabled: boolean;
    loading: boolean;
  };
  deleteInHead: {
    disabled: boolean;
    loading: boolean;
  };
  deleteInTail: {
    disabled: boolean;
    loading: boolean;
  };
  addByIndex: {
    disabled: boolean;
    loading: boolean;
  };
  deleteByIndex: {
    disabled: boolean;
    loading: boolean;
  };
}

export const ListPage: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [index, setIndex] = React.useState("");
  const [state, setState] = React.useState<ILinkedItem[]>([]);
  const [color, setColor] = React.useState({ index: 0, color: false });
  const [moveIndex, setMoveIndex] = React.useState(-1);
  const [buttonsStatus, setButtonsStatus] = React.useState<IButtonsStatus>({
    addInHead: {
      disabled: false,
      loading: false,
    },
    addInTail: {
      disabled: false,
      loading: false,
    },
    deleteInHead: {
      disabled: false,
      loading: false,
    },
    deleteInTail: {
      disabled: false,
      loading: false,
    },
    addByIndex: {
      disabled: false,
      loading: false,
    },
    deleteByIndex: {
      disabled: false,
      loading: false,
    }
  })

  const linkedList = React.useMemo(() => {
    const list = new LinkedList<string>();
    list.append("0");
    list.append("34");
    list.append("8");
    list.append("1");
    setState([...list.print()]);
    return list;
  }, []);

  const setButtonsDefault = () => {
    setButtonsStatus({
      addInHead: {
        disabled: false,
        loading: false,
      },
      addInTail: {
        disabled: false,
        loading: false,
      },
      deleteInHead: {
        disabled: false,
        loading: false,
      },
      deleteInTail: {
        disabled: false,
        loading: false,
      },
      addByIndex: {
        disabled: false,
        loading: false,
      },
      deleteByIndex: {
        disabled: false,
        loading: false,
      }
    })
  }

  const changeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const changeIndex = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(evt.target.value);
  };

  const addInHead = () => {
    linkedList.insertAt(value, 0);
    state[0] = {
      ...state[0],
      up: (
        <Circle letter={value} state={ElementStates.Changing} isSmall={true} />
      ),
    };
    setButtonsStatus({
      addInHead: {
        disabled: false,
        loading: true,
      },
      addInTail: {
        disabled: true,
        loading: false,
      },
      deleteInHead: {
        disabled: true,
        loading: false,
      },
      deleteInTail: {
        disabled: true,
        loading: false,
      },
      addByIndex: {
        disabled: true,
        loading: false,
      },
      deleteByIndex: {
        disabled: true,
        loading: false,
      }
    })
    setTimeout(() => {
      setState([...linkedList.print()]);
      setColor({ index: 0, color: true });
      setTimeout(() => {        
        setColor({ index: 0, color: false });
        setValue("");
        setButtonsDefault()
      }, 1000);
    }, 1000);    
  };

  const addInTail = () => {
    linkedList.append(value);
    state[state.length - 1] = {
      ...state[state.length - 1],
      up: (
        <Circle letter={value} state={ElementStates.Changing} isSmall={true} />
      ),
    };
    setButtonsStatus({
      addInHead: {
        disabled: true,
        loading: false,
      },
      addInTail: {
        disabled: false,
        loading: true,
      },
      deleteInHead: {
        disabled: true,
        loading: false,
      },
      deleteInTail: {
        disabled: true,
        loading: false,
      },
      addByIndex: {
        disabled: true,
        loading: false,
      },
      deleteByIndex: {
        disabled: true,
        loading: false,
      }
    })
    setTimeout(() => {
      setState([...linkedList.print()]);
      setColor({ index: state.length, color: true });
      setTimeout(() => {
        setColor({ index: state.length, color: false });
        setValue("");
        setButtonsDefault()
      }, 1000);
    }, 1000);
  };

  const deleteInHead = () => {
    linkedList.deleteHead();
    setButtonsStatus({
      addInHead: {
        disabled: true,
        loading: false,
      },
      addInTail: {
        disabled: true,
        loading: false,
      },
      deleteInHead: {
        disabled: false,
        loading: true,
      },
      deleteInTail: {
        disabled: true,
        loading: false,
      },
      addByIndex: {
        disabled: true,
        loading: false,
      },
      deleteByIndex: {
        disabled: true,
        loading: false,
      }
    })
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
    setTimeout(() => {
      setState([...linkedList.print()]);
      setButtonsDefault()
    }, 1000);
  };

  const deleteInTail = () => {
    linkedList.removeFrom(state.length - 1);
    setButtonsStatus({
      addInHead: {
        disabled: true,
        loading: false,
      },
      addInTail: {
        disabled: true,
        loading: false,
      },
      deleteInHead: {
        disabled: true,
        loading: false,
      },
      deleteInTail: {
        disabled: false,
        loading: true,
      },
      addByIndex: {
        disabled: true,
        loading: false,
      },
      deleteByIndex: {
        disabled: true,
        loading: false,
      }
    })
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
    setTimeout(() => {
      setState([...linkedList.print()]);
      setButtonsDefault()
    }, 1000);
  };

  const addByIndex = () => {
    if (index === "0") {
      addInHead();
    }
    if (Number(index) >= state.length) {
      return;
    } else {
      setButtonsStatus({
        addInHead: {
          disabled: true,
          loading: false,
        },
        addInTail: {
          disabled: true,
          loading: false,
        },
        deleteInHead: {
          disabled: true,
          loading: false,
        },
        deleteInTail: {
          disabled: true,
          loading: false,
        },
        addByIndex: {
          disabled: false,
          loading: true,
        },
        deleteByIndex: {
          disabled: true,
          loading: false,
        }
      })
      linkedList.insertAt(value, Number(index));
      let i = 0;
      let t = 0;
      function moving() {
        setTimeout(() => {
          t = 1000;
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
            if (state[i] !== j) {
              arr.push(j);
            } else {
              arr.push(item);
            }
          }
          setState([...arr]);
          if (i < Number(index)) {
            setTimeout(() => {
              setMoveIndex(i - 1);
            }, 1000);
          }
          i++;
          if (i <= Number(index) + 1) {
            moving();
          } else {
            setState([...linkedList.print()]);
            setColor({ index: i - 2, color: true });
            setMoveIndex(-1);
            setTimeout(() => {
              setColor({ index: i - 2, color: false });
              setButtonsDefault()
              setValue("");
              setIndex("");
            }, 1000);
          }
        }, t);
      }
      moving();
    }
  };

  const removeByIndex = () => {
    if (index === "0") {
      deleteInHead();
    }
    if (Number(index) >= state.length) {
      return;
    } else {
      setButtonsStatus({
        addInHead: {
          disabled: true,
          loading: false,
        },
        addInTail: {
          disabled: true,
          loading: false,
        },
        deleteInHead: {
          disabled: true,
          loading: false,
        },
        deleteInTail: {
          disabled: true,
          loading: false,
        },
        addByIndex: {
          disabled: true,
          loading: false,
        },
        deleteByIndex: {
          disabled: false,
          loading: true,
        }
      })
      linkedList.removeFrom(Number(index));
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
                    letter={state[i - 1].value}
                    state={ElementStates.Changing}
                    isSmall={true}
                  />
                ),
                value: "",
                next: Number(index) === state.length - 1 ? false : true,
              };
              for (let j of state) {
                if (state[i] !== j) {
                  arr.push(j);
                } else {
                  arr.push(item);
                }
              }
              setState([...arr]);
              setMoveIndex(i - 1);
              setTimeout(() => {
                setState([...linkedList.print()]);
                setButtonsDefault()
                setMoveIndex(-1);
                setValue("");
                setIndex("");
              }, 1000);
            }, 1000);
          }
        }, 1000);
      }
      moving();
    }
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
          />
          <Button
            linkedList="big"
            text="Добавить по индексу"
            type="button"
            onClick={addByIndex}
            disabled={!(index.length > 0 && value.length > 0) || buttonsStatus.addByIndex.disabled}
            isLoader={buttonsStatus.addByIndex.loading}
          />
          <Button
            linkedList="big"
            text="Удалить по индексу"
            type="button"
            onClick={removeByIndex}
            disabled={!(index.length > 0) || buttonsStatus.deleteByIndex.disabled}
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
                index === color.index && color.color
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
