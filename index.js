import axios from "axios";

export default class Buffy {
  constructor(opts) {
    this.url = new URL(opts.url).toString();
    if(this.url.endsWith("/")) this.url = this.url.slice(0, this.url.length - 1);
    this.validateStatus = opts.validateStatus ? opts.validateStatus : (status) => status >= 200 && status < 300;
  }

  /**
   * Proxy a Request
   * @param {Request} req 
   * @param {Response} res 
   * @param {Function} next 
   */
  async request(req, res, next) {
    try {
      // Get the asset from the website as a Stream
      const response = await axios({
        method: req.method,
        url: this.url + req.url,
        responseType: "stream",
        validateStatus: this.validateStatus
      });
      // Send the HTTP status code and the MIME type
      res.writeHead(response.status, { "Content-Type": response.headers.get("content-type").split(";")[0] });
      // Pipe the asset to the response
      response.data.pipe(res);
    } catch(error) {
      next();
    }
  }
}