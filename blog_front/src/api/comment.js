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
  return new Promise((resolve, reject) => {
    Http.post(bizData).then(data => {
      if (data.code === '001') return resolve(data.comments);
      reject('文章评论详情失败');
    })
  })
};

const addNewComment = commentInfo => {
  let { id, toUserName, fromUserName, content, time } = commentInfo;
  const bizData = {
    url: addCommentUrl,
    data: {
      id,
      toUserName,
      fromUserName,
      content,
      time,
      commentId: `${id}${fromUserName}${Date.now()}`
    }

  }
  return Http.post(bizData);
}
export {
  getCommentsById,
  addNewComment
}
