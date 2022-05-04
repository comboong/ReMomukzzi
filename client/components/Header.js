import Link from "next/link";
import { Menu } from "antd";

const Header = () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }
  const id = getRandomInt(1, 100);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/mypage">
            <a>마이페이지</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/shopdetail/[id]" as={`/shopdetail/${id}`}>
            <a>임시 가게정보</a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
