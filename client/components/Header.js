import Link from "next/link";
import Cookies from "js-cookie";
import styled from "styled-components";
import { useCallback, useState, useEffect } from "react";
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
    min-width: 680px;

    @media (max-width: 960px) {
      .navlist {
        margin: 15px 20px;
      }
    }

    @media (max-width: 881px) {
      .navlist {
        margin: 15px 15px;
      }
    }

    @media (max-width: 840px) {
      .navlist {
        margin: 15px 10px;
      }
    }

    @media (max-width: 800px) {
      .navlist {
        margin: 15px 5px;
      }
    }

    @media (max-width: 761px) {
      .navlist {
        margin: 15px 0px;
      }
    }

    @media (max-width: 720px) {
      .navbar_menu {
        padding-left: 0px;
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
  const [nick, setNick] = useState(Cookies.get("nickname"));

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

  useEffect(() => {
    setNick(Cookies.get("nickname"));
  }, [nick]);

  return (
    <HeaderContainer>
      <nav className="navbar">
        <div className="navbar_logo">
          <Link href="/">
            <img
              src="https://cdn.discordapp.com/attachments/968002114511073283/977107063681478716/b8f3403718a83d04.png"
              style={{ width: 250, height: 100, objectFit: "cover" }}
            />
          </Link>
        </div>
        {Cookies.get("accessToken") ? (
          <ul className="navbar_menu">
            <li className="navlist">
              <div>{nick}님</div>
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
export default Header;