import OauthCheck from "../components/Login/OauthCheck";
import { useRouter } from "next/router";

const oauthloading = () => {
  const router = useRouter();

  return (
    <>
      <OauthCheck code={router.asPath.split("=")[1]} />
    </>
  );
};
export default oauthloading;
