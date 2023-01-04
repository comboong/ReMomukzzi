import axios from "axios";
import Cookies from "js-cookie";
import { BsTrash } from "react-icons/bs";

const Myreviewdelete = ({ id }) => {
  const accessToken = Cookies.get("accessToken");

  const deleteModal = () => {
    if (window.confirm("정말 리뷰를 삭제하시겠습니까?")) {
      deleteHandler();
    } else {
      alert("취소했습니다.");
    }
  };

  const deleteHandler = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews`,
          {
            data: {
              review_id: id,
            },
          },
          {
            headers: { authorization: `Bearer ${accessToken}` },
            "Content-Type": "application/json",
          }
        )
        .then(res => {
          alert("리뷰가 삭제됐습니다.");
          return location.replace("/mypage");
        })
        .catch(err => {
          alert("잘못된 요청입니다");
        });
    }
  };

  return (
    <BsTrash style={{ cursor: "pointer" }} size="22" onClick={deleteModal} />
  );
};

export default Myreviewdelete;
