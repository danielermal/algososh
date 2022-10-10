import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("Тестирование компонента Circle", () => {
    it("без буквы", () => {
        const tree = renderer.create(<Circle letter="" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("с буквами", () => {
        const tree = renderer.create(<Circle letter="test" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("с head", () => {
        const tree = renderer.create(<Circle head={"test"} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("с react-элементом в head", () => {
        const tree = renderer.create(<Circle head={<Circle letter="1" />} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("с tail", () => {
        const tree = renderer.create(<Circle tail={"test"} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("с react-элементом в tail", () => {
        const tree = renderer.create(<Circle tail={<Circle letter="1" />} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("с index", () => {
        const tree = renderer.create(<Circle index={1} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("с пропсом isSmall", () => {
        const tree = renderer.create(<Circle isSmall={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("в состоянии default", () => {
        const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("в состоянии changing", () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("в состоянии modified", () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})