import Http from "@assets/js/http";
import { commentModule } from "@config/requestUrlConfig";

const {
  getCommentsUrl
} = commentModule;

const getCommentsById = id => {
  const bizData = {
    url: getCommentsUrl,
    data: {
      id
    }
  };
  return Http.post(bizData);
};
export  {
  getCommentsById
}
