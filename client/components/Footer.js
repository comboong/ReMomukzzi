import Link from "next/link";
import styled from "styled-components";
import { BsGithub } from "react-icons/bs";

const FooterContainer = styled.footer`
  display: flex;
  border: 1px solid black;
  height: 150px;
  background-color: #3e3e3e;
  color: white;
  bottom: 0;
  margin-top: 30px;

  @media (max-width: 550px) {
    display: none;
  }

  .footer_info {
    list-style-type: none;
    flex: 1 1 auto;
    margin-left: 200px;
    text-decoration: none;
    user-select: none;

    @media (max-width: 1200px) {
      list-style-type: none;
      flex: 1 1 auto;
      text-decoration: none;
      margin-left: 50px;
    }

    @media (max-width: 1044px) {
      list-style-type: none;
      flex: 1 1 auto;
      text-decoration: none;
      margin-left: 0px;
    }

    @media (max-width: 701px) {
      list-style-type: none;
      flex: 1 1 auto;
      text-decoration: none;
    }
  }

  .footer_info > li {
    @media (max-width: 1024px) {
      font-size: 12px;
    }

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }

  .footer_info > li div {
    height: 100px;
    font-size: 40px;
    color: white;
    padding-top: 10px;
    cursor: pointer;

    @media (max-width: 1280px) {
      font-size: 36px;
      padding-top: 20px;
      padding-left: 20px;
    }

    @media (max-width: 1024px) {
      font-size: 32px;
      padding-top: 20px;
      padding-left: 20px;
    }

    @media (max-width: 768px) {
      font-size: 24px;
      padding-top: 30px;
      padding-left: 30px;
    }
  }

  .footer_github {
    flex: 1 1 auto;
    margin-left: 200px;

    @media only screen and (max-width: 1002px) {
      margin-left: 100px;
    }

    @media only screen and (max-width: 894px) {
      margin-left: 50px;
    }

    @media only screen and (max-width: 843px) {
      margin-left: 0px;
    }
  }

  .footer_github > ul {
    list-style-type: none;
    font-size: 25px;
  }

  .footer_github_members {
    display: flex;

    @media (max-width: 1280px) {
      font-size: 20px;
    }

    @media (max-width: 1024px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  .footer_github_members > div {
    padding: 3px 5px;
    margin: 5px 10px;
  }

  .github_icons {
    font-size: 50px;
    color: white;
  }

  .currentColor {
    font-size: 25px;
  }

  .footer_github_members_name {
    height: 50px;
    line-height: 50px;
  }

  .footer_github_members_name > a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }

  #github_title {
    user-select: none;
    margin: 10px;
    padding-top: 5px;

    @media (max-width: 1280px) {
      font-size: 24px;
      padding-top: 10px;
    }

    @media (max-width: 1024px) {
      font-size: 20px;
      padding-top: 12px;
    }

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ul className="footer_info">
        <li>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div>MOMUKZZI</div>
          </Link>
        </li>
        <li>Copyright @ 2022 All right Reserved</li>
      </ul>
      <div className="footer_github">
        <ul>
          <li id="github_title">TEAM MEMBERS</li>
          <li className="footer_github_members">
            <div>
              <a
                href="https://github.com/kimyounlim/ReMomukzzi"
                target="_blank"
              >
                <BsGithub className="github_icons" />
              </a>
            </div>
            <div className="footer_github_members_name">
              <a href="https://github.com/EuilimChoi" target="_blank">
                최의림
              </a>
            </div>
            <div className="footer_github_members_name">
              <a href="https://github.com/yomae" target="_blank">
                김여명
              </a>
            </div>
            <div className="footer_github_members_name">
              <a href="https://github.com/hyukzz" target="_blank">
                정윤혁
              </a>
            </div>
          </li>
        </ul>
      </div>
    </FooterContainer>
  );
};

export default Footer;