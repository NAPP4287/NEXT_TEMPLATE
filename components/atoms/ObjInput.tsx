// interface
import { IObjInput } from "@/types/IProps";

const ObjInput = (props: IObjInput) => {
  const {
    styles,
    idx,
    name,
    setValues,
    values,
    placeholder,
    inputMode,
    type,
    maxLength,
  } = props;

  const handleChangeValue = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (Array.isArray(values) && idx) {
      // values가 배열일 때 해당 요소의 해당 키를 가진 값을 변경
      const frontArr = values.slice(0, idx);
      const backArr = values.slice(idx + 1);
      const currentValue = values[idx];

      setValues([
        ...frontArr,
        { ...currentValue, [name]: e.target.value },
        backArr,
      ]);
    } else {
      setValues({ ...values, [name]: e.target.value });
    }
  };

  return (
    <>
      {type === "textarea" ? (
        <textarea
          style={{ ...styles }}
          maxLength={maxLength}
          onChange={handleChangeValue}
          placeholder={placeholder}
          inputMode={inputMode}
        />
      ) : (
        <input
          style={{ ...styles }}
          maxLength={maxLength}
          onChange={handleChangeValue}
          placeholder={placeholder}
          inputMode={inputMode}
          type={type}
        />
      )}
    </>
  );
};

export default ObjInput;
