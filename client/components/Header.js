import Link from "next/link";
import { Menu } from "antd";

const Header = () => {
	const menuItems = [
		{
			label: (
				<Link href="/">
					<a>Home</a>
				</Link>
			),
			key: "home",
		},
		{
			label: (
				<Link href="/mypage">
					<a>마이페이지</a>
				</Link>
			),
			key: "mypage",
		},
		{
			label: (
				<Link href="/signup">
					<a>회원가입</a>
				</Link>
			),
			key: "signup",
		},
		{
			label: (
				<Link href="/login">
					<a>로그인</a>
				</Link>
			),
		},
	];

	return <Menu mode="horizontal" items={menuItems} />;
};

export default Header;
