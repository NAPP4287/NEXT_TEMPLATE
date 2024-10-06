import { useRouter, useSearchParams } from "next/navigation";
// react
import { useState, useEffect, useCallback } from "react";
// interface
import { IPaginationProps } from "@/types/IProps";

const Pagination = (props: IPaginationProps) => {
  const { pagination, setPagination, showNum, path } = props;

  const router = useRouter();
  const paramsPage = useSearchParams().get("page");
  const currentPage = pagination.currentPage;
  const lastPage = pagination.totalPage;

  const [btnArr, setBtnArr] = useState<Array<number>>([1]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);

  const handlePagination = useCallback(
    (num: number) => {
      setIsClick(true);
      setPagination({ ...pagination, currentPage: num });
      router.replace(`/${path}?page=${num}`);
    },
    [router, path, setPagination, pagination]
  );

  const handlePageBtn = useCallback(() => {
    {
      let btnArr = [];
      const showPageArrNum = Math.ceil(Number(currentPage) / showNum);
      const lastPageArrNum = Math.ceil(Number(lastPage) / showNum);

      // 총 페이지 수
      const allPageNum = pagination.totalPage;
      // 화면에 보여질 페이지의 마지막 페이지 번호
      const endPageNum =
        allPageNum < showPageArrNum * showNum
          ? allPageNum
          : showPageArrNum * showNum;

      for (
        let i = showPageArrNum * showNum - (showNum - 1);
        i <= endPageNum;
        i++
      ) {
        btnArr.push(i);
      }

      if (showPageArrNum === lastPageArrNum) {
        setIsLast(true);
      } else {
        setIsLast(false);
      }
      if (showPageArrNum === 1) {
        setIsFirst(true);
      } else {
        setIsFirst(false);
      }

      setBtnArr([...btnArr]);
    }
  }, [currentPage, lastPage, showNum, pagination.totalPage]);

  useEffect(() => {
    handlePageBtn();
  }, [currentPage, handlePageBtn]);

  useEffect(() => {
    if (paramsPage && !isClick) {
      setPagination({ ...pagination, currentPage: +paramsPage });
    } else if (currentPage === 1 || !paramsPage) {
      router.replace(`/${path}?page=1`);
      setPagination({ ...pagination, currentPage: 1 });
    }
  }, [paramsPage, isClick]);

  return (
    <div className="flex">
      {!isFirst && (
        <button
          disabled={currentPage === 1}
          onClick={() => handlePagination(1)}
          className={`cursor-pointer w-[30px] h-[30px] text-center rounded-md mx-1 border text-gray-light`}
        >
          &laquo;
        </button>
      )}
      {!isFirst && (
        <button
          disabled={Number(currentPage) === 1}
          onClick={() => handlePagination(currentPage - 1)}
          className={`cursor-pointer w-[30px] h-[30px] text-center rounded-md mx-1 border text-gray-light text-sm`}
        >
          Prev
        </button>
      )}
      <ul className="flex items-center justify-center">
        {btnArr.map((el: number, idx: number) => (
          <button
            key={idx}
            onClick={() => handlePagination(el)}
            className={`cursor-pointer w-[30px] h-[30px] text-center leading-[30px] rounded-md mx-1 ${
              currentPage === el
                ? "text-white bg-primary-sub"
                : "border text-gray-light"
            }`}
          >
            {el}
          </button>
        ))}
      </ul>
      {lastPage !== 1 && !isLast && (
        <button
          disabled={lastPage === 1}
          onClick={() => handlePagination(currentPage + 1)}
          className={`cursor-pointer w-[30px] h-[30px] text-center rounded-md mx-1 border text-gray-light text-sm`}
        >
          Next
        </button>
      )}

      {lastPage !== 1 && !isLast && (
        <button
          disabled={lastPage === 1}
          onClick={() => handlePagination(lastPage)}
          className={`cursor-pointer w-[30px] h-[30px] text-center rounded-md mx-1 border text-gray-light`}
        >
          &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
