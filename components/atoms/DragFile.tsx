"use client";
// react
import { useRef, useState } from "react";
// image
import Image from "next/image";
import IconImg from "@/public/assets/icons/icon_file_img.png";
import IconFile from "@/public/assets/icons/icon_file_file.png";
import IconVedio from "@/public/assets/icons/icon_file_vedio.png";
// interface
import { IDragFileProps } from "@/types/IProps";
// recoil
import { alertModalState } from "@/states/stateModal";
import { useSetRecoilState } from "recoil";

const DrageFile = (props: IDragFileProps) => {
  const {
    accept,
    descript,
    className,
    type,
    values,
    setValues,
    disabled,
    limitImg,
    limitSize,
  } = props;

  const selectFile = useRef<HTMLInputElement | null>(null);
  const imgSrc =
    type === "vedio" ? IconVedio : type === "img" ? IconImg : IconFile;
  const onInputFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    handleFiles(e.target.files);
  };

  const setAlertInfo = useSetRecoilState(alertModalState);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const format: string = `${file.name.split(".").slice(-1)}`.toUpperCase();

      if ((await chkFileFormatSize(format, file)) === "go") {
        handlePreviewImg(file);
      }
    }
  };

  // 프리뷰 이미지 함수
  const handlePreviewImg = (file: File) => {
    if (type === "img") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader) {
          setSelectedImage(reader.result);
          setValues({ fileName: "img", filePath: reader.result });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setValues({ filePath: "path 넣어주기", fileName: file.name });
    }
  };

  // 파일 포맷 혹은 사이즈 용량 체크 함수
  const chkFileFormatSize = async (format: string, file: File) => {
    const acceptFormats = accept.split(",").map((el) => el.toUpperCase());

    if (!acceptFormats.includes(`.${format}`)) {
      return setAlertInfo({
        isOpen: true,
        isOne: true,
        title: "에러",
        type: "error",
        contents: "파일 포맷을 확인하여주세요.",
        lbtnTitle: "확인",
        action: () => {},
      });
    }
    // 파일 포맷이 img이고 사이즈 제한이 있을 때
    if (limitImg) {
      const chkImgSize = await handleLimitImgSize(file);
      if (chkImgSize !== "go") {
        return setAlertInfo({
          isOpen: true,
          isOne: true,
          title: "에러",
          type: "error",
          contents: "사이즈 규정에 맞춰 업로드해주세요.",
          lbtnTitle: "확인",
          action: () => {},
        });
      }
    }

    // 파일 용량 제한이 있을 때
    if (limitSize) {
      const chkLimitSize = handleLimitSize(file);
      if (chkLimitSize !== "go") {
        return setAlertInfo({
          isOpen: true,
          isOne: true,
          title: "에러",
          type: "error",
          contents: "파일 용량을 초과하였습니다.",
          lbtnTitle: "확인",
          action: () => {},
        });
      }
    }
    return "go";
  };

  // 파일 용량 제한이 있을 때 함수
  const handleLimitSize = (file: File) => {
    const fileSize = file.size;
    const unit = limitSize?.unit;
    const size: number = limitSize ? limitSize.size : 1;

    if (unit === "KB") {
      return 1024 * size >= fileSize && "go";
    }

    if (unit === "MB") {
      return 1024 * 1024 * size >= fileSize && "go";
    }

    if (unit === "GB") {
      return 1024 * 1024 * 1024 * size >= fileSize && "go";
    }

    if (unit === "TB") {
      return 1024 * 1024 * 1024 * 1024 * size >= fileSize && "go";
    }
  };

  // 포맷이 이미지 일 떄, 사이즈 제한 함수
  const handleLimitImgSize = async (file: File) => {
    const dimensions = await getImageDimensions(file);
    const { width, height } = dimensions;

    // 이미지 width와 height가 제한과 같아야할 때
    if (limitImg?.type === "same") {
      return width === limitImg?.width && height === limitImg?.height && "go";
    }

    // 이미지 width와 height가 제한보다 이상이어야 할 떄
    if (limitImg?.type === "over") {
      return width >= limitImg?.width && height >= limitImg?.height && "go";
    }

    // 이미지 width와 height가 제한보다 이하이어야 할 떄
    if (limitImg?.type === "under") {
      return width <= limitImg?.width && height <= limitImg?.height && "go";
    }

    // 이미지 width와 height가 1:1비율 이어야할 때
    if (limitImg?.type === "ratio") {
      return width % height === 0 && "go";
    }
  };

  // 현재 불러오는 이미지 사이즈 체크 함수
  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 이미지 파일 처리 ondrop
  const onDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  // 파일 업로드 리셋
  const handleResetFile = () => {
    setValues({ fileName: "", filePath: "" });
  };

  return values.filePath === "" ? (
    <div
      onDragOver={!disabled ? dragOver : () => {}}
      onDrop={onDropFiles}
      onClick={() => selectFile?.current?.click()}
      className={`r-flex-center border border-gray-light w-full py-5 min-h-[180px] cursor-pointer rounded-md ${className}`}
    >
      <Image priority src={imgSrc} alt="drag_img" />
      <p className="text-md text-gray-400 text-center pt-1">{descript}</p>
      <input
        className="input_file"
        type="file"
        multiple
        onChange={onInputFile}
        style={{ display: "none" }}
        ref={selectFile || null}
        accept={accept}
        disabled={disabled}
      />
    </div>
  ) : (
    <div
      onClick={() => selectFile?.current?.click()}
      className={`r-flex-center border border-gray-light w-full min-h-[180px] rounded-md ${className}`}
    >
      {selectedImage ? (
        <div onClick={handleResetFile} className="cursor-pointer">
          <Image
            src={selectedImage as string}
            alt="Selected"
            className="preview-image"
            width={180}
            height={180}
          />
        </div>
      ) : (
        <div className="w-full flex-1 flex-center" onClick={handleResetFile}>
          <p className="text-md">{values.fileName}</p>
        </div>
      )}
    </div>
  );
};

export default DrageFile;
