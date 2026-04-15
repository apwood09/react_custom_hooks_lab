import { fireEvent,render,renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import App from "../../components/App";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;

beforeEach(() => {
  localStorage.clear();
});

describe("Custom Hooks", () => {
  test("returns an initial state and a setter function", () => {
    const { result } = renderHook(() => useLocalStorage("test", "value"));
    expect(result.current).toMatchObject(["value", expect.any(Function)]);
  });

  test("has an initial value of null of no value is passed in as a second argument", () => {
    const { result } = renderHook(() => useLocalStorage("test"));
    expect(result.current).toMatchObject([null, expect.any(Function)]);
  });

  test("saves the value in localStorage when state is updated", async () => {
    const { result } = renderHook(() => useLocalStorage("name", "old value"));
    const [, setState] = result.current;
    let{findAllByTestId} =render(<App/>)

    let input = await findAllByTestId("name")
    fireEvent.change(input[0], { target: { value: "New Value" } });
    expect(localStorage.getItem("name")).toBe("New Value");
  });
});