export default class Response {
  constructor() { }

  sendJSON(req, res) {
    let responseBody = {};
    
    if (req.response.statusCode == 200) {
      responseBody.status = 'success';
      responseBody.data = req.response.data;
    } else {
      responseBody.status = 'error';
      responseBody.data = { error: req.response.error };
    }


    res
      .status(req.response.statusCode)
      .json(responseBody)
      .end()
  }
}