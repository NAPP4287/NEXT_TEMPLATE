"use clinet";
// interface
import { ICheckBoxProps } from "@/types/IProps";
// css
import styles from "@/components/atoms/atoms.module.css";

const Checkbox = (props: ICheckBoxProps) => {
  const { type, values, setValues, name, allValue, setAllValue } = props;

  // 체크박스 전체 선택
  const handleAllCheck = (checked: boolean) => {
    let newObj: { [key: string]: boolean } = {};
    const keyList = Object.keys(values);
    if (!setAllValue) {
      return;
    }

    if (checked) {
      setAllValue(true);

      for (let i = 0; i < keyList.length; i++) {
        newObj[keyList[i]] = true;
      }
    } else {
      setAllValue(false);
      for (let i = 0; i < keyList.length; i++) {
        newObj[keyList[i]] = false;
      }
    }

    setValues({ ...newObj });
  };

  const handleSingleCheck = (checked: boolean, key: string) => {
    const chkObj = { ...values, [key]: checked };
    if (!setAllValue) {
      return setValues({ ...chkObj });
    }

    if (Object.values(chkObj).includes(false)) {
      setAllValue(false);
    } else {
      setAllValue(true);
    }
    setValues({ ...chkObj });
  };

  return (
    <div className={styles["chkbox-wrap"]}>
      <input
        type="checkbox"
        checked={type === "all" ? allValue : values[name]}
        onChange={
          type === "all"
            ? (e) => handleAllCheck(e.target.checked)
            : (e) => handleSingleCheck(e.target.checked, name)
        }
      />
    </div>
  );
};

export default Checkbox;
