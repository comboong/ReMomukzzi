import Link from "next/link";
import { Menu } from "antd";

const Header = () => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <a>마이페이지</a>
        </Menu.Item>
        <Menu.Item>
          <a>회원가입</a>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
