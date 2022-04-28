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
					<Link href="/mypage">
						<a>마이페이지</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Link href="/signup">
						<a>회원가입</a>
					</Link>
				</Menu.Item>
			</Menu>
		</div>
	);
};

export default Header;
