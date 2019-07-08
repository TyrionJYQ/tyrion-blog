import Http from "@assets/js/http";
import { userModule } from "@config/requestUrlConfig";
const { loginUrl, registerUrl, logoutUrl } = userModule;
const doLogin = userInfo => {
  let bizData = {
    data: userInfo,
    url: loginUrl
  };
  return Http.post(bizData);
};

const getV_code = () => Http.get({ url: "tyrionblog/user/v_code" });

const doRegister = userInfo => {
  let bizData = {
    data: userInfo,
    url: registerUrl
  };
  return Http.post(bizData);
};
// test
const doLogout = () => {
  let bizData = {
    url: logoutUrl
  };
  return Http.post(bizData);
};

export { doLogin, getV_code, doRegister, doLogout };
