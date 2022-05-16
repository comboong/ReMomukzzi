import Link from "next/link";
import { Menu } from "antd";
import Cookies from "js-cookie";
import styled from "styled-components";
import { useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { FavoriteAction } from "../reducers";

const HeaderContainer = styled.div`
  margin: 0 auto;
  .navbar {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1c83e;
    padding: 9px 12px;
    min-width: 564px;

    @media only screen and (max-width: 804px) {
      .navlist {
        margin: 15px 20px;
      }
    }

    @media only screen and (max-width: 725px) {
      .navlist {
        margin: 15px 15px;
      }
    }

    @media only screen and (max-width: 684px) {
      .navlist {
        margin: 15px 10px;
      }
    }

    @media only screen and (max-width: 642px) {
      .navlist {
        margin: 15px 5px;
      }
    }

    @media only screen and (max-width: 602px) {
      .navlist {
        margin: 15px 0px;
      }
    }
  }

  .navbar_logo {
    flex: 1 1 auto;
  }

  .navbar_logo img {
    width: 200px;
  }

  .navbar_menu {
    display: flex;
    list-style: none;
    font-size: 20px;
    margin: 0px;
  }

  .navbar_menu li {
    padding: 9px 12px;
    margin: 15px 30px;
    cursor: pointer;
    text-decoration: none;
  }

  .navbar_menu li:hover {
    background-color: #d49466;
    border-radius: 4px;
  }

  .navbar_menu li > div {
    color: #533026;
  }

  .navbar_link {
    text-decoration: none;
    color: #533026;
  }

  .navbar_icons {
    list-style: none;
    color: #533026;
    display: flex;
    margin-right: 20px;
  }

  .navbar_icons li {
    padding: 8px 12px;
  }
  .navbar_icons li:hover {
    background-color: #d49466;
    border-radius: 4px;
  }
  .navbar_toggleBtn {
    position: absolute;
    right: 32px;
    width: 23px;
    display: none;
  }
  .person_circle {
    font-size: 30px;
  }
  .navbar_icons > li {
    cursor: pointer;
  }
`;

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = useCallback(() => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          Cookies.remove("accessToken");
          Cookies.remove("nickname");
          Cookies.remove("email");
          Cookies.remove("Oauth");

          localStorage.setItem("visited", JSON.stringify([]));

          console.log(res);
          router.push("/");
        });
    }
  });

  return (
    <HeaderContainer>
      <nav className="navbar">
        <div className="navbar_logo">
          <Link href="/">
            <a>로고 들어갈 부분</a>
          </Link>
        </div>
        {Cookies.get("accessToken") ? (
          <ul className="navbar_menu">
            <li className="navlist">
              <div>{Cookies.get("nickname")}님</div>
            </li>
            <li className="navlist">
              <Link href="/mypage" className="navbar_link">
                <div>마이페이지</div>
              </Link>
            </li>
            <li onClick={handleLogOut} className="navlist">
              <div>로그아웃</div>
            </li>
            <li
              onClick={() => {
                dispatch(FavoriteAction(true));
              }}
              className="navlist"
            >
              <div>즐겨찾기</div>
            </li>
          </ul>
        ) : (
          <ul className="navbar_menu">
            <li className="navlist">
              <Link href="/login">
                <div>로그인</div>
              </Link>
            </li>
            <li className="navlist">
              <Link href="/signup">
                <div>회원가입</div>
              </Link>
            </li>
            <li
              onClick={() => {
                dispatch(FavoriteAction(true));
              }}
              className="navlist"
            >
              <div>즐겨찾기</div>
            </li>
          </ul>
        )}
      </nav>
    </HeaderContainer>
  );
};
// const Header = () => {
// 	const menuItems = [
// 		{
// 			label: (
// 				<Link href="/">
// 					<a>Home</a>
// 				</Link>
// 			),
// 			key: "home",
// 		},
// 		{
// 			label: (
// 				<Link href="/mypage">
// 					<a>마이페이지</a>
// 				</Link>
// 			),
// 			key: "mypage",
// 		},
// 		{
// 			label: (
// 				<Link href="/signup">
// 					<a>회원가입</a>
// 				</Link>
// 			),
// 			key: "signup",
// 		},
// 		{
// 			label: (
// 				<Link href="/login">
// 					<a>로그인</a>
// 				</Link>
// 			),
// 		},
// 	];

// 	return <Menu mode="horizontal" items={menuItems} />;
// };

export default Header;
