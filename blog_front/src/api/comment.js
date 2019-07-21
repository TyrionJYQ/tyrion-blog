import Http from "@assets/js/http";
import { commentModule } from "@config/requestUrlConfig";

const {
  getCommentsUrl,
  addCommentUrl
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

const addNewComment = () => {
  const bizData = {
    url: addCommentUrl,
    data: {
      id: '7341633937',
      toUserName: 'JYQ1',
      fromUserName: 'JYQ11',
      content: '一个能打的都没有',
      time: '1563712891241',
      Content_Id: '7'
    }

  }
  return Http.post(bizData);
}
export {
  getCommentsById,
  addNewComment
}
