// 컴포넌트 사용 or 유틸 사용 예제 페이지
"use client";
import dynamic from "next/dynamic";
// img
import IconImg from "@/public/assets/icons/icon_accounts.png";
// react
import { useState } from "react";
// components
import Input from "@/components/atoms/Input";
import ObjInput from "@/components/atoms/ObjInput";
import InvaildChkInput from "@/components/atoms/InvalidChkInput";
import Button from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import Pagination from "@/components/atoms/Pagination";
import Select from "@/components/atoms/Select";
import ObjSelect from "@/components/atoms/ObjSelect";
import DrageFile from "@/components/atoms/DragFile";
// utils
import { handleCountTil, changeTypeObj } from "@/utils/commonUtils";
// data
import { DSignupInput } from "@/data/DInput";
import { DDummySelectList } from "@/data/DSelect";
// recoil
import { useSetRecoilState } from "recoil";
import { alertModalState, loadingModalState } from "@/states/stateModal";

const DynamicEditorBox = dynamic(
  () => import("@/components/edtior/EditorBox"),
  {
    ssr: false,
  }
);

const ExamplePage = () => {
  // alertModal recoil
  const setAlertInfo = useSetRecoilState(alertModalState);
  // loadingModal recoil
  const setLoading = useSetRecoilState(loadingModalState);
  // 단일 인풋 state
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

  // 유효성 검사 인풋 state
  const [invalidChkInfo, setInvalidChkInfo] = useState({
    email: "",
    uId: "",
    phone: "",
    pwd: "",
    pwdChk: "",
    ssr: "",
  });

  // obj input state
  const [objInput, setObjInput] = useState({
    apple: "",
    banana: "",
  });
  const [objInputArr, setObjInputArr] = useState<
    Array<{ [key: string]: string }>
  >([{ 이메일: "", 비밀번호: "" }]);

  // 단일 select state
  const [select, setSelect] = useState("");

  // obj select state
  const [objSelect, setObjSelect] = useState({
    apple: "",
    banana: "",
    grape: "",
  });
  const [objSelectArr, setObjSelectArr] = useState([
    { apple: "", banana: "", grape: "" },
  ]);

  // pagination state
  const [pagination, setPagination] = useState<{
    totalPage: number;
    currentPage: number;
  }>({
    totalPage: 10,
    currentPage: 1,
  });

  // dragFile state
  const [dragFile, setDragFile] = useState({ fileName: "", filePath: "" });
  const [dragDocFile, setDragDocFile] = useState({
    fileName: "",
    filePath: "",
  });

  // objInputArr 추가 버튼
  const addObjArr = () => {
    setObjInputArr([{ peter: "", bella: "" }, ...objInputArr]);
  };

  // objSelectArr 추가 버튼
  const addObjSelectArr = () => {
    setObjSelectArr([{ apple: "", banana: "", grape: "" }, ...objSelectArr]);
  };

  const [editorContent, setEditorContent] = useState("");

  return (
    <div className="r-flex-center mx-w-500 my-[100px]">
      <h1>단일 인풋</h1>
      <Input
        value={input1}
        setValue={setInput1}
        placeholder={"기본 예제입니다."}
        inputMode={"text"}
        type={"text"}
        maxLength={undefined}
        isRound={false}
      />
      <Input
        value={input2}
        className="my-5"
        setValue={setInput2}
        placeholder={"border color & input type 예제입니다."}
        inputMode={"numeric"}
        type={"number"}
        border="red-main"
        maxLength={undefined}
        isRound={true}
      />
      <Input
        value={input3}
        setValue={setInput3}
        placeholder={"maxLength & fontSize 예제입니다."}
        inputMode={"text"}
        type={"text"}
        fontSize="text-sm"
        maxLength={5}
        isRound={true}
      />
      <Input
        value={input4}
        setValue={setInput4}
        placeholder={"disabled 예제입니다."}
        inputMode={"numeric"}
        type={"number"}
        maxLength={undefined}
        isRound={true}
        disabled={true}
        className="my-5"
      />

      <h1 className="mt-5">유효성 검사 인풋</h1>
      {Object.keys(DSignupInput).map((el: string) => (
        <div className="w-full" key={el}>
          <Label
            title={DSignupInput[el].name}
            isRequire={DSignupInput[el].require}
          />
          <InvaildChkInput
            isRound={true}
            name={el}
            setValues={setInvalidChkInfo}
            values={invalidChkInfo}
            placeholder={DSignupInput[el].placeholder}
            inputMode={DSignupInput[el].inputMode}
            type={DSignupInput[el].type}
            maxLength={undefined}
            invalidTxt={DSignupInput[el].invalidTxt}
          />
        </div>
      ))}

      <h1>버튼</h1>
      <Button
        title={"예제"}
        isRound={false}
        bg={"red-light"}
        action={() => {
          console.log("함수를 추가해주세요.");
        }}
        color={"white"}
      />
      <Button
        title={"예제"}
        isRound={true}
        bg={"white"}
        border={"green-light"}
        action={() => {
          console.log("함수를 추가해주세요.");
        }}
        color={"green-light"}
        className="my-5"
      />
      <Button
        title={"예제"}
        isRound={true}
        bg={"black"}
        action={() => {
          console.log("함수를 추가해주세요.");
        }}
        color={"white"}
        img={IconImg}
        imgPlace="left"
      />
      <Button
        title={"예제"}
        isRound={true}
        bg={"black"}
        action={() => {
          console.log("함수를 추가해주세요.");
        }}
        fontSize="text-lg"
        color={"white"}
        img={IconImg}
        imgPlace="right"
        className="my-5"
      />
      <Button
        title={"선택 불가 예제"}
        bg={"gray-light"}
        action={() => {
          console.log("함수를 추가해주세요.");
        }}
        color={"white"}
        disabled={true}
        isRound={true}
        className="mb-5"
      />

      <h1>OBJ Input 응용</h1>
      <ObjInput
        isRound={false}
        name={"apple"}
        setValues={setObjInput}
        values={objInput}
        placeholder={"단순 OBJECT"}
        inputMode={"text"}
        type={"text"}
        maxLength={undefined}
      />
      <ObjInput
        isRound={false}
        name={"banana"}
        setValues={setObjInput}
        values={objInput}
        placeholder={"단순 OBJECT"}
        inputMode={"text"}
        type={"text"}
        maxLength={undefined}
        className="my-5"
      />
      <h1>OBJ Input Array 응용</h1>
      <Button
        title={"추가하기"}
        isRound={true}
        bg={"green-light"}
        action={addObjArr}
        color={"white"}
      />
      {objInputArr.map((el, idx) =>
        Object.keys(el).map((key) => (
          <ObjInput
            key={key}
            idx={idx}
            isRound={false}
            name={key}
            setValues={setObjInputArr}
            values={objInputArr}
            placeholder={key}
            inputMode={"text"}
            type={"text"}
            maxLength={undefined}
            className="mt-2"
          />
        ))
      )}

      <h1 className="mt-5">유틸 사용</h1>
      <div>인자 타입 string 허용: {handleCountTil("1000000")}</div>
      <div>인자 타입 number 허용: {handleCountTil(1000000)}</div>
      <br />
      <div>
        특정 obj의 value값 변경하기: <br />
        {`a의 value type: ${typeof changeTypeObj(
          { a: "11", b: "12", c: "13" },
          ["a", "b"],
          "number"
        ).a}`}
        <br />
        {`c의 value type: ${typeof changeTypeObj(
          { a: "11", b: "12", c: "13" },
          ["a"],
          "number"
        ).c}`}
      </div>
      <h1 className="mt-5">페이지네이션</h1>
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        showNum={3}
        path={"example"}
      />

      <h1 className="mt-5">알럿 모달 열기</h1>
      <Button
        title={"모달 열기"}
        bg={"primary-sub"}
        color={"white"}
        action={() =>
          setAlertInfo({
            isOpen: true,
            isOne: false,
            title: "제목",
            contents: "컨텐츠입니다.",
            action: () => console.log("함수 액션입니다."),
            type: "success",
            lbtnTitle: "취소",
            rbtnTitle: "확인",
          })
        }
        isRound={true}
      />
      <h1 className="mt-5">로딩 모달 열기</h1>
      <Button
        title={"로딩 모달 열기"}
        bg={"primary-sub"}
        color={"white"}
        action={() => setLoading(true)}
        isRound={true}
      />

      <h1 className="mt-5">단일 Select</h1>
      <Select
        name={"exSelect"}
        value={select}
        setValue={setSelect}
        selectDisabled={false}
        placeholder={"옵션을 선택해주세요."}
        list={DDummySelectList}
        isRound={true}
      />

      <h1 className="mt-5">Obj Select 응용</h1>
      <ObjSelect
        name={"apple"}
        list={DDummySelectList}
        selectDisabled={false}
        setValues={setObjSelect}
        values={objSelect}
        placeholder={"값을 선택하여 주세요."}
        isRound={false}
      />
      <ObjSelect
        name={"grape"}
        list={DDummySelectList}
        selectDisabled={false}
        setValues={setObjSelect}
        values={objSelect}
        placeholder={"값을 선택하여 주세요."}
        isRound={false}
        className="mt-2"
      />

      <h1 className="mt-5">Obj Select Array 응용</h1>
      <Button
        title={"추가하기"}
        isRound={true}
        bg={"green-light"}
        action={addObjSelectArr}
        color={"white"}
      />
      {objSelectArr.map((el, idx) =>
        Object.keys(el).map((key) => (
          <ObjSelect
            key={key}
            idx={idx}
            isRound={false}
            name={key}
            setValues={setObjSelectArr}
            values={objSelectArr}
            placeholder={"값을 선택해주세요."}
            className="mt-2"
            list={DDummySelectList}
            selectDisabled={false}
          />
        ))
      )}

      <h1 className="mt-5">Drag File</h1>
      <DrageFile
        accept={".pdf"}
        descript={<>파일을 업로드해주세요.</>}
        type={"doc"}
        values={dragDocFile}
        setValues={setDragDocFile}
        limitSize={{ unit: "MB", size: 13 }}
      />
      <DrageFile
        accept={".png,.jpg,.jpeg"}
        descript={<>이미지를 업로드해주세요.</>}
        type={"img"}
        values={dragFile}
        setValues={setDragFile}
        // limitImg={{ width: 100, height: 100, type: "over" }} // width 100px, height 100px 보다 큰 이미지들만 받겠다.
        limitSize={{ unit: "MB", size: 2 }} // 2KB
        className="mt-2"
      />

      <DynamicEditorBox value={editorContent} setValue={setEditorContent} />
    </div>
  );
};

export default ExamplePage;
